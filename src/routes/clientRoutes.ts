import express from "express";
import { body } from "express-validator";
import {
  createClientController,
  deleteClientController,
  getClientByIdController,
  getClientsController,
  updateClientController
} from "../controllers/clientController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";

const router = express.Router({ mergeParams: true });
router.use(validateBarIDParam);

router.post(
  "/",
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("phoneNumber").notEmpty().withMessage("phoneNumber is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  createClientController
);

router.get("/", getClientsController);
router.get("/:id", getClientByIdController);
router.put("/:id", updateClientController);
router.delete("/:id", deleteClientController);

export default router;
