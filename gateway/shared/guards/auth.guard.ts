import { BaseHttpException } from "./../exceptions/base-http-exception";
import { TokenPayload } from "./../interfaces/token.interface";
import { getAuthToken } from "./../utils/token-utils";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { RequestContext } from "../interfaces/request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    const token = getAuthToken(request.headers);
    console.log(token);
    if (!token) throw new BaseHttpException("EN", 600);
    const userPayload = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
    if (!userPayload) throw new BaseHttpException("EN", 600);
    request.currentUser = userPayload;
    return true;
  }
}
