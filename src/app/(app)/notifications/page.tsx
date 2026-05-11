import { ShellCard } from "@/components/feed/ShellCard";
import { notifications } from "@/data/portfolio";

const tone: Record<string, { bg: string; dot: string }> = {
  analytics: { bg: "bg-blue-50",    dot: "bg-blue-500" },
  network:   { bg: "bg-emerald-50", dot: "bg-emerald-500" },
  reminder:  { bg: "bg-amber-50",   dot: "bg-amber-500" },
};

const icons: Record<string, string> = {
  analytics: "📊",
  network:   "🌐",
  reminder:  "🔔",
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => (n as { unread?: boolean }).unread).length;

  return (
    <div className="mx-auto max-w-[760px] space-y-3">
      <ShellCard>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-[var(--li-text-muted)]">
          Recent activity from your network, clients, and projects.
        </p>
      </ShellCard>

      <ShellCard noPadding>
        <ul>
          {notifications.map((item) => {
            const style = tone[item.type] ?? { bg: "bg-gray-50", dot: "bg-gray-400" };
            const unread = (item as { unread?: boolean }).unread;
            return (
              <li
                key={item.id}
                className={`border-b border-black/[0.06] px-4 py-4 last:border-b-0 transition-colors hover:bg-black/[0.02] ${unread ? style.bg : ""}`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-xl">{icons[item.type] ?? "🔔"}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm leading-snug ${unread ? "font-semibold text-[var(--li-text)]" : "font-medium text-[var(--li-text)]"}`}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--li-text-faint)]">{item.time}</p>
                  </div>
                  {unread && (
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} aria-label="Unread" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </ShellCard>
    </div>
  );
}
