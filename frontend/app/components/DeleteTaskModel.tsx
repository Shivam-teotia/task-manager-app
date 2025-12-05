import { Task } from "../types/interface";
import { useAppDispatch } from "../redux/hook";
import { deleteTask } from "../redux/tasks/tasksThunks";

interface Props {
    task: Task;
    onClose: () => void;
}

export default function DeleteTaskModel({ task, onClose }: Readonly<Props>) {
    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(deleteTask(task._id));
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-full max-w-md space-y-3">
                <h3 className="font-semibold text-sm">Delete Task</h3>
                <p>Are you confirmed ?</p>
                <p>This action is irreversible</p>
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded-md text-xs border border-slate-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 rounded-md text-xs bg-red-500 text-white font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
