import { Request } from "express";
import { JwtUserPayload } from "../middlewares/authMiddleware";

export interface RequestWithBarID extends Request {
  params: {
    barID: string;
    [key: string]: string;
  };
  user: JwtUserPayload;
}

export type RequestWithUserContext = Request;
