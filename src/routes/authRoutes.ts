import { Router } from "express";
import { register, login, requestPasswordResetController, resetPasswordController } from "../controllers/authController";
import { check } from "express-validator";
import rateLimit from "express-rate-limit";

const router = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,  // Max 5 login attempts per IP
    message: { message: "Too many login attempts. Try again later." },
    standardHeaders: true,  // Return rate limit info in headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

router.post(
    "/register",
    [
        check("first", "First name is required").notEmpty(),
        check("last", "Last name is required").notEmpty(),
        check("email", "Valid email is required").isEmail(),
        check("phoneNumber", "Phone number is required").notEmpty(),
        check(
            "password",
            "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character."
        ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ],
    register
);

router.post(
    "/login",
    loginLimiter,
    [
        check("email", "Valid email is required").isEmail(),
        check("password", "Password is required").notEmpty(),
    ],
    login
);


router.post("/request-reset-password", requestPasswordResetController);
router.post("/reset-password", resetPasswordController);

export default router;
