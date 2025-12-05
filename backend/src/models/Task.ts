import mongoose, { Schema, Document } from "mongoose";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface ITask extends Document {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "DONE"],
            default: "TODO",
        },
        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            default: "MEDIUM",
        },
        dueDate: { type: Date },
    },
    { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
