import { useAppSelector } from "../redux/hook";

export default function TaskList() {
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

    return (
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-slate-900/80">
                    <tr>
                        <th className="text-left px-3 py-2">Title</th>
                        <th className="text-left px-3 py-2">Status</th>
                        <th className="text-left px-3 py-2">Priority</th>
                        <th className="text-left px-3 py-2">Due</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((t) => (
                        <tr key={t._id} className="border-t border-slate-700">
                            <td className="px-3 py-2">{t.title}</td>
                            <td className="px-3 py-2 text-xs">{t.status}</td>
                            <td className="px-3 py-2 text-xs">{t.priority}</td>
                            <td className="px-3 py-2 text-xs">
                                {t.dueDate
                                    ? new Date(t.dueDate).toLocaleString()
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-3 py-4 text-center text-slate-400"
                            >
                                No tasks found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
