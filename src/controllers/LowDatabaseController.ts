import { JSONFile } from "lowdb/node";
import type { CRUDOperations, UserModel, User, Users } from "../types";

export default class LowDatabaseController
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

  public async update(id: string, data: User): Promise<void> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users.map((user: User): User => {
        if (user.id === id) {
          return data;
        }
        return user;
      });
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

  public async ckeckUser(id: string): Promise<boolean> {
    this.model = await super.read();
    if (this.model !== null) {
      this.data = this.model.users;
      return this.data.map(({ id }: User): string => id).includes(id);
    } 
    return false
  }
}
