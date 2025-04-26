import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    const frontendUrl = process.env.FRONTEND_URL as string;
    const appDeeplinkUrl = process.env.APP_DEEPLINK_URL as string;

    const resetLinkWeb = `${frontendUrl}/reset-password?token=${resetToken}`;
    const resetLinkApp = `${appDeeplinkUrl}/reset-password?token=${resetToken}`;

    const senderEmail = process.env.SENDGRID_FROM_EMAIL as string;
    const msg = {
        to: email,
        from: senderEmail,
        subject: "Password Reset Request",
        text: `You requested a password reset.

Reset your password from the web: ${resetLinkWeb}

Or, if you are using the mobile app, tap this link: ${resetLinkApp}

If you did not request this, please ignore this email.`,
        html: `
            <p>You requested a password reset.</p>

            <p><strong>Web Users:</strong></p>
            <p><a href="${resetLinkWeb}">Reset your password here</a></p>

            <p><strong>Mobile App Users:</strong></p>
            <p><a href="${resetLinkApp}">Tap here to open the app and reset your password</a></p>

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
