import express from "express";
import { body } from "express-validator";
import {
  createInventoryReportController,
  deleteInventoryReportController,
  getInventoryReportByIdController,
  getInventoryReportsController,
  updateInventoryReportController,
} from "../controllers/inventoryReportController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";

const router = express.Router({ mergeParams: true });
router.use(authenticateToken, authorizeBusinessOwnership, validateBarIDParam);

router.post(
  "/",
  body("reportDate").notEmpty().withMessage("reportDate is required"),
  body("items").isArray({ min: 1 }).withMessage("items must be a non-empty array"),
  body("items.*.itemID").notEmpty().withMessage("Each item must include itemID"),
  body("items.*.quantity").isInt({ gt: 0 }).withMessage("Each item must have a quantity greater than 0"),
  createInventoryReportController
);

router.get("/", getInventoryReportsController);
router.get("/:id", getInventoryReportByIdController);
router.put("/:id", updateInventoryReportController);
router.delete("/:id", deleteInventoryReportController);

export default router;
