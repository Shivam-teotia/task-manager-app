export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ParsedVoiceTask {
    transcript: string;
    title: string;
    dueDate: string | null;
    priority: TaskPriority;
    status: TaskStatus;
}
