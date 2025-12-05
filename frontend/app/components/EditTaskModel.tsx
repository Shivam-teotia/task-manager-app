import { useState } from "react";
import { Task, TaskPriority, TaskStatus } from "../types/interface";
import { useAppDispatch } from "../redux/hook";
import { updateTask } from "../redux/tasks/tasksThunks";

interface Props {
    task: Task;
    onClose: () => void;
}

export default function EditTaskModal({ task, onClose }: Readonly<Props>) {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [status, setStatus] = useState<TaskStatus>(task.status);
    const [priority, setPriority] = useState<TaskPriority>(task.priority);
    const [dueDate, setDueDate] = useState(
        task.dueDate ? task.dueDate.slice(0, 16) : ""
    );

    const handleUpdate = () => {
        dispatch(
            updateTask({
                id: task._id,
                updates: {
                    title,
                    description,
                    status,
                    priority,
                    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
                },
            })
        );
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-full max-w-md space-y-3">
                <h3 className="font-semibold text-sm">Edit Task</h3>

                <input
                    className="w-full px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title *"
                />

                <textarea
                    className="w-full px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />

                <div className="flex flex-wrap gap-2">
                    <select
                        className="flex-1 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as TaskStatus)
                        }
                    >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>

                    <select
                        className="flex-1 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm"
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
                    className="w-full px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded-md text-xs border border-slate-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="px-3 py-1 rounded-md text-xs bg-sky-500 text-slate-900 font-medium"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
