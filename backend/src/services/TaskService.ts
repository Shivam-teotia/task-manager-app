import { ITask, Task } from "../models/Task";

export interface TaskFilters {
    status?: string;
    priority?: string;
    dueBefore?: Date;
    search?: string;
}

export const createTask = async (data: Partial<ITask>) => {
    return Task.create(data);
};

export const getTasks = async (filters: TaskFilters = {}) => {
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.dueBefore) query.dueDate = { $lte: filters.dueBefore };
    if (filters.search) {
        query.$or = [
            { title: new RegExp(filters.search, "i") },
            { description: new RegExp(filters.search, "i") },
        ];
    }
    return Task.find(query).sort({ createdAt: -1 });
};

export const getTaskById = async (id: string) => Task.findById(id);

export const updateTask = async (id: string, data: Partial<ITask>) =>
    Task.findByIdAndUpdate(id, data, { new: true });

export const deleteTask = async (id: string) => Task.findByIdAndDelete(id);
