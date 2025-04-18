import express from "express";
import { body } from "express-validator";
import {
  createWorkReportController,
  deleteWorkReportController,
  getWorkReportByIdController,
  getWorkReportsController,
  updateWorkReportController,
} from "../controllers/workReportController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";

const router = express.Router({ mergeParams: true });
router.use(validateBarIDParam);

router.post(
  "/",
  authenticateToken,
  authorizeBusinessOwnership,
  body("client_id").notEmpty(),
  body("eventDate").notEmpty(),
  body("workDate").notEmpty(),
  body("eventName").notEmpty(),
  createWorkReportController
);

router.get("/", getWorkReportsController);
router.get("/:id", getWorkReportByIdController);
router.put("/:id", updateWorkReportController);
router.delete("/:id", deleteWorkReportController);

export default router;