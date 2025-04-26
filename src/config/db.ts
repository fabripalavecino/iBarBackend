import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB Disconnected");
});

export default connectDB;
