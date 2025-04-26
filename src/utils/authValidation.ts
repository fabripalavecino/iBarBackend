import { RegisterRequest, LoginRequest } from "../types/auth.types";

export const validateRegisterInput = (data: RegisterRequest): string | null => {
    const { first, last, email, phoneNumber, password } = data;

    if (!first || !last || !email || !phoneNumber || !password) {
        return "All fields are required.";
    }

    if (!isValidPassword(password)) {
        return "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    return null;
};

export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validateLoginInput = (data: LoginRequest): string | null => {
    if (!data.email || !data.password) {
        return "Email and password are required.";
    }
    return null;
};
