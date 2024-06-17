import { JSONFile } from "lowdb/node";
import type { CRUDOperations, UserModel, User, Users } from "../types";
import { password } from "bun";

export default class LowDatabase
  extends JSONFile<UserModel>
  implements CRUDOperations<UserModel, User>
{
  private model: UserModel | null;
  private data: Users | null;

  public constructor(filename: string) {
    super(filename);
    this.model = null;
    this.data = null;
  }

  public override async read(): Promise<UserModel | null> {
    return await super.read();
  }

  public async readWithId(id: string): Promise<User | null> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users;
      for (const user of this.data) {
        if (id === user.id) {
          return user;
        }
      }
      return null;
    }
    return null;
  }

  public async readAll(): Promise<Users | null> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users;
      return this.data;
    }
    return null;
  }

  public async create(data: User): Promise<void> {
    this.model = await super.read();
    if (this.model !== null) {
      this.model.users.push(data);
      await super.write(this.model);
      return;
    }
  }

  public async update(id: string, data: Partial<User>): Promise<void> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users;
      const users: Users = [];
      for (const user of this.data) {
        if (id === user.id) {
          const keys: string[] = Object.keys(data);
          for (const key of keys) {
            if (key === "firstname" && typeof data[key] === "string") {
              user[key] = data[key];
            }
            if (key === "lastname" && typeof data[key] === "string") {
              user[key] = data[key];
            }
            if (key === "age" && typeof data[key] === "number") {
              user[key] = data[key];
            }
            if (key === "sex" && typeof data[key] === "string") {
              user[key] = data[key];
            }
            if (key === "birthday" && typeof data[key] === "string") {
              user[key] = data[key];
            }
            if (key === "id" && typeof data[key] === "string") {
              user[key] = data[key];
            }
            if (key === "email" && typeof data[key] === "string") {
              user[key] = data[key];
            }
            if (key === "password" && typeof data[key] === "string") {
              user[key] = (await password.verify(data[key], user[key]))
                ? user[key]
                : await password.hash(data[key]);
            }
          }
        }
        users.push(user);
      }
      this.data = users;
      this.model.users = this.data;
      await super.write(this.model);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users.filter((user: User): boolean => {
        return user.id !== id;
      });
      this.model.users = this.data;
      await super.write(this.model);
      return;
    }
  }

  public getInstance(): this {
    return this;
  }

  public async findUserWithId(id: string): Promise<boolean> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users;
      return this.data.map(({ id }: User): string => id).includes(id);
    }
    return false;
  }
}
