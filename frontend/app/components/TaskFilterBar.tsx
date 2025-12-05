import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
    setPriorityFilter,
    setSearch,
    setStatusFilter,
} from "../redux/tasks/tasksSlice";
import { TaskPriority, TaskStatus } from "../types/interface";

export default function TaskFilterBar() {
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector((s) => s.tasks);

    return (
        <div className="flex flex-wrap gap-2 items-center bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
            <input
                placeholder="Search title or description..."
                value={filters.search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="p-2 rounded-md text-sm bg-slate-900 border border-slate-700 flex-1 min-w-[180px]"
            />
            <select
                className="p-2 rounded-md text-sm bg-slate-900 border border-slate-700"
                value={filters.status}
                onChange={(e) =>
                    dispatch(setStatusFilter(e.target.value as TaskStatus))
                }
            >
                <option value="ALL">Any</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
            <select
                className="p-2 rounded-md text-sm bg-slate-900 border border-slate-700"
                value={filters.priority}
                onChange={(e) =>
                    dispatch(setPriorityFilter(e.target.value as TaskPriority))
                }
            >
                <option value="ALL">Any</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
            </select>
        </div>
    );
}
