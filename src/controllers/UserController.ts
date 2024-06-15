import { file, password } from "bun";
import type { Request, Response, NextFunction } from "express";
import LowDatabaseController from "./LowDatabaseController";
import Helper from "../utils";
import type {
  Sender,
  HandlerFunction,
  Params,
  User,
  Users,
  UserManagement,
  ReqBody,
  ResBody,
} from "../types";

const db: LowDatabaseController = new LowDatabaseController(
  "dbfile.json"
).getInstance();

export default class UserController
  implements
    Sender<HandlerFunction<Params>>,
    UserManagement<HandlerFunction<Params, ResBody<User>, ReqBody<User>>>
{
  public async sendHtmlFile(
    { path }: Request<Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const filePath: string = Helper.getStaticFile(path);
    const exists: boolean = await file(filePath).exists();

    if (exists) {
      res.type("html").sendFile(filePath);
      return;
    }

    res.send("<h1>Not found 404.</h1>");
  }

  public async sendData(
    { params: { id } }: Request<Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: User | null = await db.readWithId(id);
      if (result !== null) {
        res.send(result);
        return;
      }
      throw new Error("Something went wrong!!!");
    } catch (e: unknown) {
      res.send({ error: (e as Error).message });
    }
  }

  public async sendAllData(
    req: Request<Params>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result: Users | null = await db.readAll();
      if (result !== null) {
        res.send(result);
        return;
      }
      throw new Error("Something went wrong!!!");
    } catch (e: unknown) {
      res.send({ error: (e as Error).message });
    }
  }

  public async createUser(
    { body }: Request<Params, ResBody<User>, ReqBody<User>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (await db.ckeckUser(body.id)) {
      body = { ...body, password: await password.hash(body.password) };
      await db.create(body);
      res.send("Created successfully.");
      return;
    }

    res.send("Something went wrong!!!");
  }

  public async updateUser(
    { params: { id }, body }: Request<Params, ResBody<User>, ReqBody<User>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (await db.ckeckUser(id)) {
      await db.update(id, body);
      res.send("Updated successfully.");
      return;
    }

    res.send("Something went wrong!!!");
  }

  public async deleteUser(
    { params: { id } }: Request<Params, ResBody<User>, ReqBody<User>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (await db.ckeckUser(id)) {
      await db.delete(id);
      res.send("Deleted successfully.");
      return;
    }

    res.send("Something went wrong!!!");
  }
}
