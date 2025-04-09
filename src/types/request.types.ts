import { Request } from "express";

export interface RequestWithBarID extends Request {
  params: {
    barID: string;
    [key: string]: string;
  };
}

export type RequestWithUserContext = Request;
