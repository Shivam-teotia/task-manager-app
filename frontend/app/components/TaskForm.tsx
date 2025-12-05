import { FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { TaskPriority, TaskStatus } from "../types/interface";
import { createTask } from "../redux/tasks/tasksThunks";

export default function TaskForm() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatus>("TODO");
    const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
    const [dueDate, setDueDate] = useState("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        dispatch(
            createTask({
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
            })
        );
        setTitle("");
        setDescription("");
        setStatus("TODO");
        setPriority("MEDIUM");
        setDueDate("");
    };

    return (
        <form
            onSubmit={onSubmit}
            className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-3"
        >
            <h3 className="font-semibold text-sm">Create Task</h3>
            <input
                className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-sm"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-sm"
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
                <select
                    className="flex-1 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
                <select
                    className="flex-1 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-sm"
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value as TaskPriority)
                    }
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                </select>
            </div>
            <input
                type="datetime-local"
                className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button
                type="submit"
                className="w-full py-1.5 text-sm rounded-md bg-sky-500 hover:bg-sky-400 text-slate-900 font-medium"
            >
                Save
            </button>
        </form>
    );
}
