import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task, ParsedVoiceTask } from "../../types/interface";
import { api } from "@/app/config/apiClient";

export const fetchTasks = createAsyncThunk<Task[]>(
    "tasks/fetchTasks",
    async () => {
        const res = await api.get<Task[]>("/tasks");
        return res.data;
    }
);

export const createTask = createAsyncThunk<Task, Partial<Task>>(
    "tasks/createTask",
    async (payload) => {
        const res = await api.post<Task>("/tasks", payload);
        return res.data;
    }
);

export const updateTask = createAsyncThunk<
    Task,
    { id: string; updates: Partial<Task> }
>("tasks/updateTask", async ({ id, updates }) => {
    const res = await api.put<Task>(`/tasks/${id}`, updates);
    return res.data;
});

export const deleteTask = createAsyncThunk<string, string>(
    "tasks/deleteTask",
    async (id) => {
        await api.delete(`/tasks/${id}`);
        return id;
    }
);

export const parseVoice = createAsyncThunk<ParsedVoiceTask, string>(
    "tasks/parseVoice",
    async (transcript) => {
        const res = await api.post<ParsedVoiceTask>("/voice/parse", {
            transcript,
        });
        // Convert Date to ISO string for frontend if needed
        const parsed = res.data;
        return {
            ...parsed,
            dueDate: parsed.dueDate
                ? new Date(parsed.dueDate).toISOString()
                : null,
        };
    }
);
