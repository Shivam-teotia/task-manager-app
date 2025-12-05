import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchTasks } from "../redux/tasks/tasksThunks";
import { setView } from "../redux/tasks/tasksSlice";
import TaskFilterBar from "./TaskFilterBar";
import TaskBoard from "./TaskBoard";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import VoiceInput from "./VoiceInput";
import VoiceReviewModal from "./VoiceReviewModel";

export default function TasksPage() {
    const dispatch = useAppDispatch();
    const { view, voiceDraft } = useAppSelector((s) => s.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <TaskFilterBar />
                <div className="flex gap-2">
                    <button
                        className={`px-3 py-1 rounded-md text-sm border ${
                            view === "BOARD"
                                ? "bg-slate-100 text-slate-900"
                                : "border-slate-600"
                        }`}
                        onClick={() => dispatch(setView("BOARD"))}
                    >
                        Board
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md text-sm border ${
                            view === "LIST"
                                ? "bg-slate-100 text-slate-900"
                                : "border-slate-600"
                        }`}
                        onClick={() => dispatch(setView("LIST"))}
                    >
                        List
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold">Tasks</h2>
                        <VoiceInput />
                    </div>
                    {view === "BOARD" ? <TaskBoard /> : <TaskList />}
                </div>

                <div className="w-full md:w-80">
                    <TaskForm />
                </div>
            </div>

            {voiceDraft && <VoiceReviewModal />}
        </div>
    );
}
