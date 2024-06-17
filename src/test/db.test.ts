import LowDatabase from "../db/LowDatabase";
import type { User } from "../types";
import Helper from "../utils/Helper";

const db: LowDatabase = new LowDatabase("dbfile.json");

for(let i: number = 1; i <= 1; i++){
    const user: User = await Helper.getRandomUser();
    await db.create(user);    
}