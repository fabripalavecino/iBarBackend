import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();

// 🔹 Connect to DB & Start Server
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
    console.error("❌ Database connection failed:", err);
});
