import express from "express";
import { body } from "express-validator";
import {
  createFileController,
  deleteFileController,
  getFileByIdController,
  getFilesController,
  updateFileController
} from "../controllers/fileController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";

const router = express.Router({ mergeParams: true });
router.use(authenticateToken, authorizeBusinessOwnership, validateBarIDParam);

router.post(
  "/",
  body("fileName").notEmpty().withMessage("fileName is required"),
  body("fileType").notEmpty().withMessage("fileType is required"),
  body("fileURL").notEmpty().withMessage("fileURL is required"),
  createFileController
);

router.get("/", getFilesController);
router.get("/:id", getFileByIdController);
router.put("/:id", updateFileController);
router.delete("/:id", deleteFileController);

export default router;
