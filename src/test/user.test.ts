import Helper from "../utils/Helper";

const user = await Helper.getRandomUser();
console.log(JSON.stringify(user));
console.log(user)