import { useState } from "react";
import {
  Bell,
  AtSign,
  Hash,
  Heart,
  MessageSquare,
  Check,
  Trash2,
} from "lucide-react";
import Avatar from "../components/Avatar";
import { users } from "../data/sampleData";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "mention",
    userId: 2,
    content: "mentioned you in",
    target: "#general",
    preview: "Hey @Alex, can you review the PR when you get a chance?",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "reply",
    userId: 3,
    content: "replied to your message in",
    target: "#backend",
    preview: "That's a great point about the caching strategy!",
    time: "35m ago",
    unread: true,
  },
  {
    id: 3,
    type: "reaction",
    userId: 4,
    content: "reacted 👍 to your message in",
    target: "#design",
    preview: "",
    time: "1h ago",
    unread: true,
  },
  {
    id: 4,
    type: "mention",
    userId: 2,
    content: "mentioned you in",
    target: "#random",
    preview: "@Alex did you watch the game last night?",
    time: "2h ago",
    unread: false,
  },
  {
    id: 5,
    type: "reply",
    userId: 3,
    content: "replied to your message in",
    target: "#general",
    preview: "Totally agree, let's discuss in the next standup.",
    time: "4h ago",
    unread: false,
  },
  {
    id: 6,
    type: "reaction",
    userId: 4,
    content: "reacted ❤️ to your message in",
    target: "#announcements",
    preview: "",
    time: "Yesterday",
    unread: false,
  },
];

const TYPE_ICON = {
  mention: { icon: AtSign, color: "text-indigo-400", bg: "bg-indigo-500/15" },
  reply: {
    icon: MessageSquare,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  reaction: { icon: Heart, color: "text-rose-400", bg: "bg-rose-500/15" },
};

const FILTER_TABS = ["All", "Mentions", "Replies", "Reactions"];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Mentions") return n.type === "mention";
    if (filter === "Replies") return n.type === "reply";
    if (filter === "Reactions") return n.type === "reaction";
    return true;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const dismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950 p-6 min-w-0">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight flex items-center gap-2">
            <Bell size={22} className="text-indigo-400" />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Stay on top of mentions, replies, and reactions.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-all"
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      {/* ── Filter tabs ─────────────────────────────────────── */}
      <div className="flex items-center gap-1 mb-5 bg-gray-900/50 p-1 rounded-xl w-fit border border-gray-800/60">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
              filter === tab
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Notification list ───────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center">
            <Bell size={22} className="text-gray-500" />
          </div>
          <p className="text-gray-400 font-medium">All caught up!</p>
          <p className="text-sm text-gray-600">
            No notifications in this category.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const user = users[notif.userId];
            const { icon: TypeIcon, color, bg } = TYPE_ICON[notif.type];

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-150 group cursor-pointer ${
                  notif.unread
                    ? "bg-gray-900 border-gray-700/60 hover:border-indigo-500/30"
                    : "bg-gray-900/40 border-gray-800/40 hover:bg-gray-900/70"
                }`}
                onClick={() => markRead(notif.id)}
              >
                {/* Unread dot */}
                <div className="pt-1 shrink-0">
                  <span
                    className={`block w-2 h-2 rounded-full transition-colors ${
                      notif.unread ? "bg-indigo-500" : "bg-transparent"
                    }`}
                  />
                </div>

                {/* Type icon */}
                <div
                  className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <TypeIcon size={14} className={color} />
                </div>

                {/* Avatar */}
                <Avatar user={user} size="sm" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-100">
                      {user.name}
                    </span>{" "}
                    {notif.content}{" "}
                    <span className="text-indigo-400 font-medium">
                      {notif.target}
                    </span>
                  </p>
                  {notif.preview && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      "{notif.preview}"
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-1">{notif.time}</p>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismiss(notif.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-all shrink-0"
                  title="Dismiss"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
