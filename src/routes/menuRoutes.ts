import express from "express";
import { body } from "express-validator";
import {
  createMenuController,
  getMenusController,
  getMenuByIdController,
  updateMenuController,
  deleteMenuController,
} from "../controllers/menuController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";

const router = express.Router({ mergeParams: true });

router.use(validateBarIDParam);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("price must be a positive number"),
    body("drinksList").isArray({ min: 1 }).withMessage("drinksList must be a non-empty array"),
    body("drinksList.*.itemID").notEmpty().withMessage("Each item must include itemID"),
    body("drinksList.*.quantity")
      .isInt({ gt: 0 })
      .withMessage("Each item must have a quantity greater than 0"),
  ],
  createMenuController
);

router.get("/", getMenusController);
router.get("/:menuID", getMenuByIdController);
router.put("/:menuID", updateMenuController);
router.delete("/:menuID", deleteMenuController);

export default router;
