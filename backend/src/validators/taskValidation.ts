import { z } from "zod";

export const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title can not be empty"),
    description: z.string().optional(),
    status: TaskStatusEnum.default("TODO"),
    priority: TaskPriorityEnum.default("MEDIUM"),
    dueDate: z.union([z.string(), z.date()]).optional().nullable(),
});

export const updateTaskSchema = createTaskSchema.partial();
