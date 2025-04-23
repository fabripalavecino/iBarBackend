import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    const frontendUrl = process.env.FRONTEND_URL as string;
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    const senderEmail = process.env.SENDGRID_FROM_EMAIL as string;
    console.log(senderEmail);
    const msg = {
        to: email,
        from: senderEmail,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
        html: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    };

    console.log("Final SendGrid Payload:", msg);

    try {
        await sgMail.send(msg);
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};
