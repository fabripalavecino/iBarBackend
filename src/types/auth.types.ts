export interface RegisterRequest {
    first: string;
    last: string;
    email: string;
    phoneNumber: string;
    password: string;
    businessNumber: string;
    businessName: string;
}


export interface LoginRequest {
    email: string;
    password: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}