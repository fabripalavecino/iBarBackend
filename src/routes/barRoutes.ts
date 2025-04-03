import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
    createBarController,
    getBarsController,
    getBarByIdController,
    updateBarController,
    deleteBarController
} from "../controllers/barController";

const router = express.Router();

router.post("/", authenticateToken, createBarController); 
router.get("/", authenticateToken, getBarsController); 
router.get("/:id", authenticateToken, getBarByIdController); 
router.put("/:id", authenticateToken, updateBarController); 
router.delete("/:id", authenticateToken, deleteBarController); 

export default router;
