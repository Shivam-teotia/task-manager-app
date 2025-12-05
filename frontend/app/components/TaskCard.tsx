import { useState } from "react";
import { Task } from "../types/interface";
import EditTaskModal from "./EditTaskModel";
import DeleteTaskModel from "./DeleteTaskModel";

const priorityColors: Record<string, string> = {
    LOW: "bg-emerald-500",
    MEDIUM: "bg-sky-500",
    HIGH: "bg-amber-500",
    CRITICAL: "bg-rose-500",
};

interface Props {
    task: Task;
}

export default function TaskCard({ task }: Readonly<Props>) {
    const [open, setOpen] = useState({
        edit: false,
        delete: false,
    });

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("text/plain", task._id);
    };

    return (
        <>
            <div
                draggable
                onDragStart={handleDragStart}
                className="rounded-lg border border-slate-700 bg-slate-900/80 p-2 text-sm cursor-grab active:cursor-grabbing"
            >
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h4 className="font-medium">{task.title}</h4>
                        {task.dueDate && (
                            <p className="text-xs text-slate-400 mt-1">
                                Due {new Date(task.dueDate).toLocaleString()}
                            </p>
                        )}
                    </div>
                    <span
                        className={`w-2 h-2 rounded-full mt-1 ${
                            priorityColors[task.priority]
                        }`}
                    />
                </div>
                {task.description && (
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                        {task.description}
                    </p>
                )}
                <div className="flex gap-2">
                    <button
                        onClick={() => setOpen({ edit: true, delete: false })}
                        className="mt-2 text-[11px] text-blue-500 hover:text-blue-300"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setOpen({ edit: false, delete: true })}
                        className="mt-2 text-[11px] text-rose-400 hover:text-rose-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {open?.edit && (
                <EditTaskModal
                    task={task}
                    onClose={() => setOpen({ edit: false, delete: false })}
                />
            )}
            {open?.delete && (
                <DeleteTaskModel
                    task={task}
                    onClose={() => setOpen({ edit: false, delete: false })}
                />
            )}
        </>
    );
}
