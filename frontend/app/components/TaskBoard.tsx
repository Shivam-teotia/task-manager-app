import { useAppDispatch, useAppSelector } from "../redux/hook";
import { updateTask } from "../redux/tasks/tasksThunks";
import { TaskStatus } from "../types/interface";
import TaskColumn from "./TaskColumn";

const STATUSES: { key: TaskStatus; label: string }[] = [
    { key: "TODO", label: "To Do" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "DONE", label: "Done" },
];

export default function TaskBoard() {
    const dispatch = useAppDispatch();
    const { items, filters } = useAppSelector((s) => s.tasks);

    const filtered = items.filter((t) => {
        if (filters.status !== "ALL" && t.status !== filters.status)
            return false;
        if (filters.priority !== "ALL" && t.priority !== filters.priority)
            return false;
        if (filters.search) {
            const q = filters.search.toLowerCase();
            if (
                !t.title.toLowerCase().includes(q) &&
                !(t.description || "").toLowerCase().includes(q)
            ) {
                return false;
            }
        }
        return true;
    });

    const handleDrop = (taskId: string, newStatus: TaskStatus) => {
        dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
    };

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {STATUSES.map((col) => (
                <TaskColumn
                    key={col.key}
                    status={col.key}
                    label={col.label}
                    tasks={filtered.filter((t) => t.status === col.key)}
                    onDropTask={handleDrop}
                />
            ))}
        </div>
    );
}
