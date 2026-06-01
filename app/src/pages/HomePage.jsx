import { TrendingUp, Users, Hash, ArrowRight, Zap } from "lucide-react";
import Avatar from "../components/Avatar";
import { users, rooms } from "../data/sampleData";

const ACTIVITY_FEED = [
  { id: 1, userId: 2, action: "posted in", target: "#general", time: "2m ago" },
  { id: 2, userId: 3, action: "joined", target: "#backend", time: "15m ago" },
  {
    id: 3,
    userId: 4,
    action: "pinned a message in",
    target: "#design",
    time: "1h ago",
  },
  { id: 4, userId: 2, action: "posted in", target: "#random", time: "2h ago" },
  {
    id: 5,
    userId: 3,
    action: "posted in",
    target: "#announcements",
    time: "3h ago",
  },
];

const STATS = [
  {
    label: "Active Rooms",
    value: "5",
    icon: Hash,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Online Now",
    value: "2",
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Messages",
    value: "142",
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Active Today",
    value: "3",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export default function HomePage() {
  const onlineUsers = Object.values(users).filter((u) => u.status === "online");

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950 p-6 min-w-0">
      {/* ── Page title ──────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
          Good morning, Alex 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening across your workspace.
        </p>
      </div>

      {/* ── Stats grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800/60 rounded-xl p-4 flex items-center gap-3 py-8"
          >
            <div
              className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}
            >
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100 leading-tight">
                {value}
              </p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Activity feed ──────────────────────────────────── */}
        <section className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800/60 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-100">
              Recent Activity
            </h2>
            <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">
              View all
            </span>
          </div>
          <ul className="divide-y divide-gray-800/50">
            {ACTIVITY_FEED.map((item) => {
              const user = users[item.userId];
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-800/40 transition-colors"
                >
                  <Avatar user={user} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-gray-100">
                        {user.name}
                      </span>{" "}
                      {item.action}{" "}
                      <span className="text-indigo-400">{item.target}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">
                    {item.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-6">
          {/* ── Online members ───────────────────────────────── */}
          <section className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800/60">
              <h2 className="text-sm font-semibold text-gray-100">
                Online Now
                <span className="ml-2 text-xs font-normal text-green-400">
                  {onlineUsers.length} active
                </span>
              </h2>
            </div>
            <ul className="divide-y divide-gray-800/50">
              {Object.values(users).map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-800/40 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <Avatar user={user} size="sm" />
                    <span
                      className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-gray-900 ${
                        user.status === "online"
                          ? "bg-green-400"
                          : user.status === "away"
                            ? "bg-yellow-400"
                            : "bg-gray-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-200">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Quick join rooms ─────────────────────────────── */}
          <section className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800/60">
              <h2 className="text-sm font-semibold text-gray-100">
                Jump Back In
              </h2>
            </div>
            <ul className="divide-y divide-gray-800/50">
              {rooms.slice(0, 3).map((room) => (
                <li
                  key={room.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-800/40 transition-colors cursor-pointer group"
                >
                  <span className="text-gray-500 text-sm font-medium group-hover:text-indigo-400 transition-colors">
                    #
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 group-hover:text-gray-100 transition-colors">
                      {room.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {room.lastMessage}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0"
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
