import LowDatabaseController from "../controllers/LowDatabaseController";
import type { User } from "../types";
import Helper from "../utils/Helper";

const db = new LowDatabaseController("dbfile.json");

for(let i: number = 1; i <= 1; i++){
    const user: User = await Helper.getRandomUser();
    await db.create(user);    
}