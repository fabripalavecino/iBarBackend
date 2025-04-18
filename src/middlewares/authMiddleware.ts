import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtUserPayload {
  id: string;
  email: string;
  role: "barOwner" | "barManager";
  businessID: string;
  barID?: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user: JwtUserPayload;
  }
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtUserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
