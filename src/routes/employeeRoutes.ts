import { Router } from "express";
import { createEmployeeController, deleteEmployeeController, getEmployeeByIdController, getEmployeesByBarController, updateEmployeeController } from "../controllers/employeeController";
import { validateBarIDParam } from "../middlewares/validateBarIdParam";



const router = Router({ mergeParams: true });
router.use(validateBarIDParam);


router.post("/", createEmployeeController);
router.get("/", getEmployeesByBarController);
router.get("/:id", getEmployeeByIdController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", deleteEmployeeController);

export default router;
