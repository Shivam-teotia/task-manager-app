"use client";
import TasksPage from "./components/TaskPage";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <header className="border-b border-slate-700 px-6 py-4 flex items-center justify-between bg-slate-900/80 backdrop-blur">
                <h1 className="text-xl font-semibold">Voice Task Tracker</h1>
            </header>
            <main className="flex-1 p-4 md:p-8">
                <TasksPage />
            </main>
        </div>
    );
}
