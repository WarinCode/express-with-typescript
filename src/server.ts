import express, {
  type Express,
  json,
  static as static_,
  urlencoded,
} from "express";
import morgan from "morgan";
import router from "./router/router";

const server: Express = express();
const port: number = 3000;

server.use(json());
server.use(urlencoded({ extended: false }));
server.use(router);
server.use(static_("public"));
server.use(morgan("dev"));

server.listen(port, (): void => {
  console.log("Server is running on port:", port);
});
