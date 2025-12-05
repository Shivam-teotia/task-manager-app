import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    Task,
    ParsedVoiceTask,
    TaskStatus,
    TaskPriority,
} from "../../types/interface";
import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    parseVoice,
} from "./tasksThunks";

interface TasksState {
    items: Task[];
    loading: boolean;
    error: string | null;
    filters: {
        status: TaskStatus | "ALL";
        priority: TaskPriority | "ALL";
        search: string;
    };
    view: "BOARD" | "LIST";
    voiceDraft: ParsedVoiceTask | null;
    voiceParsing: boolean;
}

const initialState: TasksState = {
    items: [],
    loading: false,
    error: null,
    filters: { status: "ALL", priority: "ALL", search: "" },
    view: "BOARD",
    voiceDraft: null,
    voiceParsing: false,
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setView(state, action: PayloadAction<"BOARD" | "LIST">) {
            state.view = action.payload;
        },
        setStatusFilter(
            state,
            action: PayloadAction<TasksState["filters"]["status"]>
        ) {
            state.filters.status = action.payload;
        },
        setPriorityFilter(
            state,
            action: PayloadAction<TasksState["filters"]["priority"]>
        ) {
            state.filters.priority = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.filters.search = action.payload;
        },
        clearVoiceDraft(state) {
            state.voiceDraft = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            });

        builder
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const idx = state.items.findIndex(
                    (t) => t._id === action.payload._id
                );
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (t) => t._id !== action.payload
                );
            });

        builder
            .addCase(parseVoice.pending, (state) => {
                state.voiceParsing = true;
            })
            .addCase(parseVoice.fulfilled, (state, action) => {
                state.voiceParsing = false;
                state.voiceDraft = action.payload;
            })
            .addCase(parseVoice.rejected, (state, action) => {
                state.voiceParsing = false;
                state.error =
                    action.error.message || "Failed to parse voice input";
            });
    },
});

export const {
    setView,
    setStatusFilter,
    setPriorityFilter,
    setSearch,
    clearVoiceDraft,
} = tasksSlice.actions;

export default tasksSlice.reducer;
