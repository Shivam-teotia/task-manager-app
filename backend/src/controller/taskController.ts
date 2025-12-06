import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/TaskService";
import { validateInput } from "../validators/validateInput";
import { createTaskSchema } from "../validators/taskValidation";

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { valid, errors } = validateInput(createTaskSchema, req.body);
        if (!valid) {
            return res.status(400).json({
                message: "Invalid input",
                errors,
            });
        }
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

export const getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { status, priority, dueBefore, search } = req.query;
        const filters: taskService.TaskFilters = {
            status: status as string,
            priority: priority as string,
            search: search as string,
            dueBefore: dueBefore ? new Date(dueBefore as string) : undefined,
        };
        const tasks = await taskService.getTasks(filters);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { valid, errors } = validateInput(createTaskSchema, req.body);
        if (!valid) {
            return res.status(400).json({
                message: "Invalid input",
                errors,
            });
        }
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const task = await taskService.deleteTask(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
