import LowDatabaseController from "../controllers/LowDatabaseController";
import type { User } from "../types";
import Helper from "../utils";

const db = new LowDatabaseController("dbfile.json");

for(let i: number = 1; i <= 20; i++){
    const user: User = await Helper.getRandomUser();
    await db.create(user);    
}

// console.log(await db.ckeckUser(user.id));
// console.log(await db.readWithId(user.id));