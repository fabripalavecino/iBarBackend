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

export default router;
