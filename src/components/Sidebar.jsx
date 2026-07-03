import { CIRCULAR } from "../data/mockData";

const AVATARS = [
  { initial: "R", bg: "bg-violet-100", text: "text-violet-700" },
  { initial: "S", bg: "bg-amber-100", text: "text-amber-700" },
  { initial: "K", bg: "bg-emerald-100", text: "text-emerald-700" },
];

const SOCIALS = ["in", "X", "gh", "disc"];

function daysUntil(dateStr) {
  const diff = Math.ceil(
    (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

export default function Sidebar({ obligations, evidence, auditLog, onOpenDashboard }) {
  const open = obligations.filter((o) => o.status !== "met" && o.deadline);
  const next = open
    .map((o) => ({ ...o, days: daysUntil(o.deadline) }))
    .sort((a, b) => a.days - b.days)[0];

  const deadlineLabel = next
    ? next.days >= 0
      ? `${next.days} days left`
      : `${Math.abs(next.days)} days overdue`
    : "No open deadlines";
  const deadlineTone =
    next && next.days < 0
      ? "bg-red-50 text-red-700"
      : "bg-emerald-50 text-emerald-700";

  return (
    <aside className="w-full flex-shrink-0 space-y-5 lg:w-[340px]">
      <div className="rounded-2xl border border-neutral-200 p-5">
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs font-medium ${deadlineTone}`}
        >
          <span>⏱</span>
          <span className="tracking-tight">
            {next ? "NEXT DEADLINE" : "STATUS"}: {deadlineLabel}
          </span>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">Circular</dt>
            <dd className="max-w-[180px] truncate text-right font-medium text-neutral-900">
              {CIRCULAR.name}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
            <dt className="text-neutral-500">Total Obligations</dt>
            <dd className="font-mono font-medium text-neutral-900">
              {obligations.length}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
            <dt className="text-neutral-500">Evidence Filed</dt>
            <dd className="font-mono font-medium text-neutral-900">
              {evidence.length}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <div className="flex -space-x-2">
            {AVATARS.map((a) => (
              <div
                key={a.initial}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-semibold ${a.bg} ${a.text}`}
              >
                {a.initial}
              </div>
            ))}
          </div>
          <p className="font-mono text-xs text-neutral-400">
            {auditLog.length} audit log entries
          </p>
        </div>

        <button
          onClick={onOpenDashboard}
          className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
        >
          Open Gap Dashboard
          <span>→</span>
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-200 p-5">
        <p className="font-semibold text-neutral-900">Need help?</p>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
          This is a prototype. For questions about the build, reach out at{" "}
          <span className="text-violet-700">team@complyguard.dev</span>
        </p>
        <div className="mt-4 flex gap-2">
          {SOCIALS.map((s) => (
            <div
              key={s}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 font-mono text-[10px] text-neutral-500"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
