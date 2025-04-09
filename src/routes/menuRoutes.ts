import express from "express";
import { body } from "express-validator";
import {
    createMenuController,
    getMenusController,
    getMenuByIdController,
    updateMenuController,
    deleteMenuController,
} from "../controllers/menuController";
import { validateBarIDParam } from "../middlewares/validateBarIdParam";


const router = express.Router({ mergeParams: true });

router.use(validateBarIDParam);

router.post(
    "/",
    [
        body("name").notEmpty().withMessage("name is required"),
        body("items").isArray({ min: 1 }).withMessage("items must be a non-empty array"),
        body("items.*.itemID").notEmpty().withMessage("Each item must include itemID"),
        body("items.*.quantity").isInt({ gt: 0 }).withMessage("Each item must have a quantity greater than 0")
    ],
    createMenuController
);

router.get("/", getMenusController);
router.get("/:menuID", getMenuByIdController);
router.put("/:menuID", updateMenuController);
router.delete("/:menuID", deleteMenuController);

export default router;
