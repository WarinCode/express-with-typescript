import type { User } from "./interfaces/interface";
import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

export * from "./interfaces/interface";

export type Users = User[];
export type ResBody<T = any> = T;
export type ReqBody<T = any> = ResBody<T>;
export type HandlerFunction<T = ParamsDictionary, D = any, A = any> = (
  req: Request<T, D, A>,
  res: Response<D>,
  next: NextFunction
) => void | Promise<void>;
export type OnSignin = Pick<User, "email" | "password">;