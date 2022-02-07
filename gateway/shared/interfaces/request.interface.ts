import { Request } from "express";
import { TokenPayload } from "./token.interface";
export interface RequestContext extends Request {
  currentUser?: TokenPayload | null;
}
