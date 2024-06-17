import { Router } from "express";
import ApiEndpoint from "../enums/ApiEndpoint";
import UserController from "../controllers/UserController";

const router: Router = Router();
const controller: UserController = new UserController();

router.get(ApiEndpoint.Root, controller.sendHtmlFile);
router.get(ApiEndpoint.About, controller.sendHtmlFile);
router.get(ApiEndpoint.Signin, controller.sendHtmlFile);
router.post(ApiEndpoint.Signin, controller.signin);
router.get(ApiEndpoint.Signup, controller.sendHtmlFile);
router.get(ApiEndpoint.Posts, controller.sendHtmlFile)
router.get(ApiEndpoint.Read, controller.sendData);
router.get(ApiEndpoint.ReadAll, controller.sendAllData);
router.post(ApiEndpoint.Create, controller.createUser);
router.put(ApiEndpoint.Update, controller.updateUser);
router.delete(ApiEndpoint.Delete, controller.deleteUser);
router.all(ApiEndpoint.NotFound, controller.sendHtmlFile);

export default router;
