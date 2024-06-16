import { file, password } from "bun";
import type { Request, Response, NextFunction } from "express";
import DatabaseController from "./DatabaseController";
import Helper from "../utils/Helper";
import type {
  Sender,
  HandlerFunction,
  Params,
  User,
  Users,
  UserManagement,
  ReqBody,
  ResBody,
  OnSignin,
} from "../types";

const db: DatabaseController = new DatabaseController(
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

    res.status(404).send("<h1>Not found!</h1>");
  }

  public async sendData(
    { params: { id } }: Request<Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result: User | null = await db.readWithId(id);
    try {
      if (result !== null) {
        res.send(result);
        return;
      }
      throw new Error("Something went wrong!!!");
    } catch (e: unknown) {
      res.send({ message: (e as Error).message, data: result });
    }
  }

  public async sendAllData(
    req: Request<Params>,
    res: Response,
    next: NextFunction
  ) {
    const result: Users | null = await db.readAll();
    try {
      if (result !== null) {
        res.send(result);
        return;
      }
      throw new Error("Something went wrong!!!");
    } catch (e: unknown) {
      res.send({ message: (e as Error).message, data: result });
    }
  }

  public async createUser(
    { body }: Request<Params, ResBody<User>, ReqBody<User>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      Helper.setUser(body);
      body = await Helper.getBody();
      await db.create(body);
      res.send("Created successfully.");
      return;
    } catch (e: unknown) {
      res.send("Something went wrong!!!");
    }
  }

  public async updateUser(
    { params: { id }, body }: Request<Params, ResBody<User>, ReqBody<User>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (await db.findUserWithId(id)) {
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
    if (await db.findUserWithId(id)) {
      await db.delete(id);
      res.send("Deleted successfully.");
      return;
    }

    res.send("Something went wrong!!!");
  }

  public async signin(
    { body }: Request<Params, ResBody<OnSignin>, ReqBody<OnSignin>>,
    res: Response,
    next: NextFunction
  ) {
    const data: Users | null = await db.readAll();
    if (data === null) {
      res.send("<h1>Login Failed!</h1><br/><a href='/signin'><button>back</button></a>");
      return;
    }
    for (const user of data) {
      if (
        user.email === body.email &&
        (await password.verify(body.password, user.password))
      ) {
        res.send(
          `
          <div style="width: 400px; margin: 50px auto 30px">
          <h1>Login Successfully</h1>
            <h4>User: ${user.firstname} ${user.lastname}</h4>
          <h4>Your user ID: ${user.id}</h4>
          <h4>Your email: ${user.email}</h4>        
          <h4>Your age: ${user.age}</h4>   
          <a href="/"><button>back to home page</button></a>
          </div>     
         `
        );
        return;
      }
    }
    res.send("<h1>Login Failed!</h1><br/><a href='/signin'><button>back</button></a>");
  }
}
