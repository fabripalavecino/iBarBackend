import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
    createBarController,
    getBarsController,
    getBarByIdController,
    updateBarController,
    deleteBarController,
    createBarManagerController
} from "../controllers/barController";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";
import employeeRoutes from "./employeeRoutes";
import itemRoutes from "./itemRoutes";
import menuRoutes from "./menuRoutes";
import workReportRoutes from "./workReportRoutes";
import shiftRoutes from "./shiftRoutes";
import taskRoutes from "./taskRoutes";
import clientRoutes from "./clientRoutes";
import inventoryReportRoutes from "./inventoryReportRoutes";
import fileRoutes from "./fileRoutes";

const router = express.Router();

router.post("/", authenticateToken, authorizeBusinessOwnership, createBarController);
router.get("/", authenticateToken, authorizeBusinessOwnership, getBarsController);
router.get("/:id", authenticateToken, authorizeBusinessOwnership, getBarByIdController);
router.put("/:id", authenticateToken, authorizeBusinessOwnership, updateBarController);
router.delete("/:id", authenticateToken, authorizeBusinessOwnership, deleteBarController);
router.post("/:barID/manager", authenticateToken, authorizeBusinessOwnership, createBarManagerController);

router.use("/:barID/employees", employeeRoutes);
router.use("/:barID/items", itemRoutes);
router.use("/:barID/menus", menuRoutes);
router.use("/:barID/work-reports", workReportRoutes);
router.use('/:barID/shifts', shiftRoutes);
router.use('/:barID/tasks', taskRoutes);
router.use('/:barID/clients', clientRoutes);
router.use('/:barID/inventory-reports', inventoryReportRoutes);
router.use('/:barID/files', fileRoutes);

export default router;
