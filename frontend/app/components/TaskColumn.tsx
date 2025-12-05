import { useAppSelector } from "../redux/hook";
import { Task, TaskStatus } from "../types/interface";
import Loader from "./Loader";
import TaskCard from "./TaskCard";

interface Props {
    status: TaskStatus;
    label: string;
    tasks: Task[];
    onDropTask: (taskId: string, newStatus: TaskStatus) => void;
}

export default function TaskColumn({
    status,
    label,
    tasks,
    onDropTask,
}: Readonly<Props>) {
    const allowDrop = (e: React.DragEvent) => e.preventDefault();
    const { loading } = useAppSelector((state) => state.tasks);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        if (taskId) onDropTask(taskId, status);
    };

    if (loading) {
        return (
            <div className="bg-slate-800/70 min-h-[200px] border border-slate-700 rounded-xl p-3 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div
            onDragOver={allowDrop}
            onDrop={handleDrop}
            className="bg-slate-800/70 border border-slate-700 rounded-xl p-3 min-h-[200px]"
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{label}</h3>
                <span className="text-xs text-slate-400">{tasks.length}</span>
            </div>
            <div className="space-y-2">
                {tasks.map((t) => (
                    <TaskCard key={t._id} task={t} />
                ))}
            </div>
        </div>
    );
}
