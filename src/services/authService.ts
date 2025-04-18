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
import { hashToken } from "../utils/hashToken";

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

  const token = generateToken(
    user._id.toString(),
    user.email,
    user.userType,
    user.businessID.toString(),
    user.barID ? user.barID.toString() : undefined
  );

  return {
    token,
    user: formatUserResponse(user),
  };
};

export const requestPasswordReset = async ({ email }: PasswordResetRequest) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const rawToken = randomBytes(32).toString("hex");
  const hashedToken = hashToken(rawToken);

  await PasswordResetToken.deleteMany({ userId: user._id });

  await PasswordResetToken.create({
    userId: user._id,
    token: hashedToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  await sendPasswordResetEmail(user.email, rawToken);
};


export const resetPassword = async ({ token, newPassword, userId }: ResetPasswordPayload) => {
  const hashedToken = hashToken(token);

  const resetRecord = await PasswordResetToken.findOne({ userId, token: hashedToken });
  if (!resetRecord) throw new Error("Invalid or expired token");

  const isTokenExpired = resetRecord.expiresAt < new Date();
  if (isTokenExpired) throw new Error("Invalid or expired token");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.deleteOne({ _id: resetRecord._id });

  console.log("🔒 Password successfully reset");
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
  barID: user.barID,
  userType: user.userType,
});


const ensureUserDoesNotExist = async (email: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists with this email");
};
