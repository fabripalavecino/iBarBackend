import express from "express";
import { body } from "express-validator";
import {
  createTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTasksController,
  updateTaskController
} from "../controllers/taskController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";

const router = express.Router({ mergeParams: true });
router.use(authenticateToken, authorizeBusinessOwnership, validateBarIDParam);

router.post(
  "/",
  body("title").notEmpty().withMessage("Title is required"),
  body("assignedTo").notEmpty().withMessage("assignedTo is required"),
  createTaskController
);

router.get("/", getTasksController);
router.get("/:id", getTaskByIdController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
