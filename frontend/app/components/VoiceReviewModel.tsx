import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { TaskPriority, TaskStatus } from "../types/interface";
import { clearVoiceDraft } from "../redux/tasks/tasksSlice";
import { createTask } from "../redux/tasks/tasksThunks";

export default function VoiceReviewModal() {
    const dispatch = useAppDispatch();
    const { voiceDraft } = useAppSelector((s) => s.tasks);

    const [title, setTitle] = useState(voiceDraft?.title || "");
    const [description, setDescription] = useState(
        voiceDraft?.transcript || ""
    );
    const [status, setStatus] = useState<TaskStatus>(
        voiceDraft?.status || "TODO"
    );
    const [priority, setPriority] = useState<TaskPriority>(
        voiceDraft?.priority || "MEDIUM"
    );
    const [dueDate, setDueDate] = useState(
        voiceDraft?.dueDate ? voiceDraft.dueDate.slice(0, 16) : ""
    );

    if (!voiceDraft) return null;

    const handleCancel = () => dispatch(clearVoiceDraft());

    const handleCreate = () => {
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
        dispatch(clearVoiceDraft());
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-full max-w-md space-y-3">
                <h3 className="font-semibold text-sm">Review voice task</h3>

                <div className="text-xs bg-slate-800/80 border border-slate-700 rounded-md p-2">
                    <p className="text-slate-400 mb-1">Transcript</p>
                    <p>{voiceDraft.transcript}</p>
                </div>

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
                    placeholder="Description (optional)"
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
                        onClick={handleCancel}
                        className="px-3 py-1 rounded-md text-xs border border-slate-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-3 py-1 rounded-md text-xs bg-sky-500 text-slate-900 font-medium"
                    >
                        Create task
                    </button>
                </div>
            </div>
        </div>
    );
}
