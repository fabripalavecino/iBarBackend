
import { Router } from "express";
import {
  getBusinessesController,
  getBusinessByIdController,
  updateBusinessController,
  deleteBusinessController,
} from "../controllers/businessController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";

const router = Router();

router.use(authenticateToken);
router.use(authorizeBusinessOwnership);

router.get("/", getBusinessesController);

router.get("/:id", getBusinessByIdController);

router.put("/:id", updateBusinessController);

router.delete("/:id", deleteBusinessController);

export default router;
