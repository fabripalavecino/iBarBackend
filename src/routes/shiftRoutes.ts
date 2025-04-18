import express from "express";
import { body } from "express-validator";
import {
  createShiftController,
  getShiftsController,
  getShiftByIdController,
  updateShiftController,
  deleteShiftController,
} from "../controllers/shiftController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";

const router = express.Router({ mergeParams: true });
router.use(authenticateToken, authorizeBusinessOwnership, validateBarIDParam);

router.post(
  "/",
  body("reportID").notEmpty(),
  body("employeeID").notEmpty(),
  body("dateOfWork").notEmpty().isISO8601(),
  body("startTime").notEmpty().isISO8601(),
  body("endTime").notEmpty().isISO8601(),
  body("totalPayment").notEmpty().isNumeric(),
  createShiftController
);

router.get("/", getShiftsController);
router.get("/:id", getShiftByIdController);
router.put("/:id", updateShiftController);
router.delete("/:id", deleteShiftController);

export default router;