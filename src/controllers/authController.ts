import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerUser, loginUser, requestPasswordReset, resetPassword } from "../services/authService";
import { RegisterRequest, LoginRequest, PasswordResetRequest, ResetPasswordPayload } from "../types/auth.types";
import { validateRegisterInput } from "../utils/authValidation";
import { mapErrorMsg } from "../utils/mapErrorMsg";


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const data: RegisterRequest = req.body;
        const validationError = validateRegisterInput(data);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        const response = await registerUser(data);
        res.status(201).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error registering user: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const data: LoginRequest = req.body;
        const response = await loginUser(data);
        res.status(200).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error logging in: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const requestPasswordResetController = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: PasswordResetRequest = req.body;
        await requestPasswordReset(data);
        res.status(200).json({ message: "Password reset link sent." });
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error requesting password reset: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: ResetPasswordPayload = req.body;
        await resetPassword(data);
        res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error resetting password: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};
