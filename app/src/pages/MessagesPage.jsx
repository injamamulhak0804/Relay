import { useState } from "react";
import { Search, Edit } from "lucide-react";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import { users } from "../data/sampleData";

// Build a DM-style conversation list from the sample users
const DM_CONVERSATIONS = Object.values(users)
  .filter((u) => u.id !== 1)
  .map((u, i) => ({
    user: u,
    lastMessage:
      [
        "Sounds good, let's sync tomorrow!",
        "Did you see the new PR?",
        "Thanks for the help 🙌",
      ][i] ?? "...",
    time: ["5m ago", "1h ago", "3h ago"][i] ?? "",
    unread: [2, 0, 1][i] ?? 0,
  }));

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(null);

  const filtered = DM_CONVERSATIONS.filter((c) =>
    c.user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-1 min-w-0 overflow-hidden">
      {/* ── DM list ─────────────────────────────────────────── */}
      <div className="w-64 bg-gray-900 border-r border-gray-800/50 flex flex-col shrink-0 h-full">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-800/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-100">
              Direct Messages
            </h2>
            <button
              title="New message"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-gray-700 transition-all"
            >
              <Edit size={14} />
            </button>
          </div>
          <div className="relative">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search messages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 text-gray-300 text-sm rounded-lg py-1.5 pl-8 pr-3 placeholder-gray-600 border border-gray-700/50 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Conversation list */}
        <ul className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {filtered.map(({ user, lastMessage, time, unread }) => (
            <li key={user.id}>
              <button
                onClick={() => setActiveId(user.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                  activeId === user.id
                    ? "bg-indigo-500/15 text-indigo-200"
                    : "hover:bg-gray-800/70"
                }`}
              >
                <div className="relative shrink-0">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 shrink-0">
                      {time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <span className="text-xs text-gray-500 truncate">
                      {lastMessage}
                    </span>
                    <Badge count={unread} />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Conversation area ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-950">
        {activeId ? <OpenDM user={users[activeId]} /> : <EmptyState />}
      </div>
    </div>
  );
}

/* ── Placeholder when no DM is open ─────────────────────── */
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center">
        <Edit size={24} className="text-gray-500" />
      </div>
      <h3 className="text-gray-200 font-semibold">Your Messages</h3>
      <p className="text-sm text-gray-500 max-w-xs">
        Select a conversation on the left to start chatting, or start a new
        direct message.
      </p>
      <button className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors">
        New Message
      </button>
    </div>
  );
}

/* ── Simple open DM thread view ──────────────────────────── */
function OpenDM({ user }) {
  const [text, setText] = useState("");

  const DEMO_MESSAGES = [
    { from: "them", content: "Hey! Are you free for a quick call later?" },
    { from: "me", content: "Sure, I'm free after 3pm. Does that work?" },
    { from: "them", content: "Perfect! I'll send a calendar invite." },
    { from: "me", content: "Sounds good 👍" },
  ];

  return (
    <>
      {/* DM header */}
      <div className="h-14 bg-gray-900 border-b border-gray-800/50 px-5 flex items-center gap-3 shrink-0">
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
        <div>
          <p className="text-sm font-semibold text-gray-100">{user.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {DEMO_MESSAGES.map((msg, i) => {
          const isMe = msg.from === "me";
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}
            >
              {!isMe && <Avatar user={user} size="xs" />}
              <div
                className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? "bg-indigo-500 text-white rounded-br-sm"
                    : "bg-gray-800 text-gray-200 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-800/50 shrink-0">
        <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5 border border-gray-700/50 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message ${user.name}…`}
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={() => setText("")}
            disabled={!text.trim()}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
              text.trim()
                ? "bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/40 scale-105"
                : "text-gray-600 cursor-not-allowed"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="w-3.5 h-3.5"
            >
              <path
                d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
