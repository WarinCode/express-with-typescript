import { password } from "bun";

const myPassword: string = "asdfgrger";
const hashPassword: string = await password.hash(myPassword);

console.log("password is:", myPassword);
console.log("hash password is:", hashPassword);
console.log(await password.verify(myPassword, hashPassword));