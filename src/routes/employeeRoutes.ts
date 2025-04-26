import { Router } from "express";
import { createEmployeeController, deleteEmployeeController, getEmployeeByIdController, getEmployeesController, updateEmployeeController } from "../controllers/employeeController";
import { validateBarIDParam } from "../middlewares/validateBarIDParam";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeBusinessOwnership } from "../middlewares/authorizeBusinessOwnership";

const router = Router({ mergeParams: true });
router.use(authenticateToken, authorizeBusinessOwnership, validateBarIDParam);


router.post("/", createEmployeeController);
router.get("/", getEmployeesController);
router.get("/:id", getEmployeeByIdController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", deleteEmployeeController);

export default router;
