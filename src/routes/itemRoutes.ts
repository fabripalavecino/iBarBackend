import express from "express";
import { body } from "express-validator";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";
import { createItemController, getItemsController, getItemByIdController, updateItemController, deleteItemController } from "../controllers/itemController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";

const router = express.Router({ mergeParams: true });
router.use(authenticateToken, authorizeBusinessOwnership, validateBarIDParam);

router.post(
    "/",
    authenticateToken,
    authorizeBusinessOwnership,
    body("name").notEmpty(),
    body("price").isNumeric(),
    body("type").notEmpty(),
    body("quantity").isInt(),
    createItemController
);

router.get("/", getItemsController);
router.get("/:id", getItemByIdController);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

export default router;
