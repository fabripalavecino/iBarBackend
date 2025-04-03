import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL as string,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
        html: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};
