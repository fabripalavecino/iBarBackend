import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    first: string;
    last: string;
    phoneNumber: string;
    email: string;
    password: string;
    userType: "barOwner" | "barManager";
    businessID: mongoose.Types.ObjectId;
    barID?: mongoose.Types.ObjectId;
    failedLoginAttempts: number;
    lockUntil: Date | null;
    comparePassword(candidatePassword: string): Promise<boolean>;
    incrementFailedLoginAttempts(): Promise<void>;
    resetFailedLoginAttempts(): Promise<void>;
}

const UserSchema = new Schema<IUser>({
    first: { type: String, required: true },
    last: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ["barOwner", "barManager"], required: true },
    businessID: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    barID: {
        type: Schema.Types.ObjectId,
        ref: "Bar",
        required: function () {
            return this.userType === "barManager";
        }
    },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null }
});


UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.incrementFailedLoginAttempts = async function () {
    this.failedLoginAttempts += 1;

    if (this.failedLoginAttempts >= 5) {
        this.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
    }

    await this.save();
};


UserSchema.methods.resetFailedLoginAttempts = async function () {
    this.failedLoginAttempts = 0;
    this.lockUntil = null;
    await this.save();
};

UserSchema.index(
    { barID: 1 },
    {
        unique: true,
        partialFilterExpression: { userType: "barManager" }
    }
);

export default mongoose.model<IUser>("User", UserSchema);
