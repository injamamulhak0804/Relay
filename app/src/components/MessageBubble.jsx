import { useState } from "react";
import { Smile, CornerUpRight } from "lucide-react";
import Avatar from "./Avatar";
import { users } from "../data/sampleData";

/**
 * MessageBubble — renders a single chat message.
 * Props:
 *   message    — message object from sampleData
 *   showAvatar — boolean, true when this is the first in a consecutive group
 */
export default function MessageBubble({ message, showAvatar }) {
  const [hovered, setHovered] = useState(false);
  const user = users[message.userId];

  return (
    <div
      className={`
        relative flex items-start gap-3 px-4 py-1 rounded-lg
        hover:bg-gray-800/40 transition-colors duration-100 group
        ${showAvatar ? "mt-3" : "mt-0.5"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Avatar or timestamp spacer ──────────────────────── */}
      <div className="w-8 shrink-0 flex justify-center pt-0.5">
        {showAvatar ? (
          <Avatar user={user} size="md" />
        ) : (
          <span
            className="
              text-xs text-gray-600 w-8 text-right
              opacity-0 group-hover:opacity-100 transition-opacity duration-150 pt-1
            "
          >
            {/* Show just the time portion on hover for grouped messages */}
            {message.timestamp?.split(" ")[0]}
          </span>
        )}
      </div>

      {/* ── Message body ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Username + timestamp header — only for the first in a group */}
        {showAvatar && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-sm font-semibold text-gray-100">
              {user.name}
            </span>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
        )}

        {/* Message text */}
        <p className="text-sm text-gray-300 leading-relaxed wrap-break-word">
          {message.content}
        </p>
      </div>

      {/* ── Hover action toolbar ─────────────────────────────── */}
      {hovered && (
        <div className="absolute right-4 -top-3 flex items-center gap-1 bg-gray-800 border border-gray-700/60 rounded-lg px-1.5 py-1 shadow-lg z-10">
          <button
            title="React"
            className="text-gray-400 hover:text-yellow-400 p-1 rounded transition-colors duration-100"
          >
            <Smile size={14} />
          </button>
          <button
            title="Reply"
            className="text-gray-400 hover:text-indigo-400 p-1 rounded transition-colors duration-100"
          >
            <CornerUpRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
