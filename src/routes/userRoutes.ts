import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

const router = Router();

router.use(authenticateToken);

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
