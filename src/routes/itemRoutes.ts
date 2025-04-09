import express from "express";
import { body } from "express-validator";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";
import { createItemController, getItemsController, getItemByIdController, updateItemController, deleteItemController } from "../controllers/itemController";
import { validateBarIDParam } from "../middlewares/validateBarIdParam";

const router = express.Router({ mergeParams: true });
router.use(validateBarIDParam);

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

router.get("/", authenticateToken, authorizeBusinessOwnership, getItemsController);
router.get("/by-id/:id", authenticateToken, authorizeBusinessOwnership, getItemByIdController);
router.put("/:id", authenticateToken, authorizeBusinessOwnership, updateItemController);
router.delete("/:id", authenticateToken, authorizeBusinessOwnership, deleteItemController);

export default router;
