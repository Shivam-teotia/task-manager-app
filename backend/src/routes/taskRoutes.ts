import { Router } from "express";
import * as taskController from "../controller/taskController";

const router = Router();

router.route("/").get(taskController.getTasks).post(taskController.createTask);

router
    .route("/:id")
    .get(taskController.getTaskById)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

export default router;
