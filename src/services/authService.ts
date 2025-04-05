import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import Business from "../models/Business";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtHelper";
import {
  RegisterRequest,
  LoginRequest,
  PasswordResetRequest,
  ResetPasswordPayload,
} from "../types/auth.types";
import { isValidPassword } from "../utils/authValidation";
import { sendPasswordResetEmail } from "./emailService";
import PasswordResetToken from "../models/PasswordResetToken";
import { randomBytes } from "crypto";

export const registerUser = async (data: RegisterRequest) => {
  const {
    first,
    last,
    email,
    phoneNumber,
    password,
    businessName,
    businessNumber,
  } = data;

  if (!isValidPassword(password)) {
    throw new Error("Password does not meet security requirements.");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await ensureUserDoesNotExist(email);

    const newBusiness = new Business({
      name: businessName,
      owner_id: new mongoose.Types.ObjectId(),
      businessNumber,
    });

    const business = await newBusiness.save({ session });

    const newUser = new User({
      first,
      last,
      email,
      phoneNumber,
      userType: "barOwner",
      businessID: business._id,
      password,
    });

    const user = await newUser.save({ session });

    business.owner_id = user._id;
    await business.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      token: generateToken(user._id.toString(), user.email, 'barOwner', business._id.toString()),
      user: formatUserResponse(user),
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    throw error;
  }
};

export const loginUser = async (data: LoginRequest) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);

  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error("Too many failed login attempts. Try again later.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    await user.incrementFailedLoginAttempts();
    throw new Error("Invalid credentials.");
  }

  await user.resetFailedLoginAttempts();

  return {
    token: generateToken(user._id.toString(),user.email, 'barOwner', user.businessID.toString()),
    user: formatUserResponse(user),
  };
};

export const requestPasswordReset = async ({ email }: PasswordResetRequest) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const resetToken = randomBytes(32).toString("hex");
    const hashedToken = bcrypt.hashSync(resetToken, 12);

    await PasswordResetToken.create({
        userId: user._id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour expiration
    });

    await sendPasswordResetEmail(user.email, resetToken);
};


export const resetPassword = async ({
  token,
  newPassword,
}: ResetPasswordPayload) => {
  const resetRecord = await PasswordResetToken.findOne();
  if (!resetRecord || !bcrypt.compareSync(token, resetRecord.token)) {
    throw new Error("Invalid or expired token");
  }

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(resetRecord.userId);
  if (!user) throw new Error("User not found");

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  await PasswordResetToken.deleteOne({ _id: resetRecord._id });
};

//  Helper Functions

const findUserByEmail = async (email: string): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials.");
  return user;
};

const formatUserResponse = (user: IUser) => ({
  _id: user._id,
  first: user.first,
  last: user.last,
  email: user.email,
  phoneNumber: user.phoneNumber,
  businessID: user.businessID,
});

const ensureUserDoesNotExist = async (email: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists with this email");
};
