import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { messages } from "../data/sampleData";

/**
 * MessageList — scrollable feed of messages with dividers and system notices.
 */
export default function MessageList() {
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message on mount
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto py-2">
      {messages.map((item, index) => {
        // ── System notice (e.g. "Jordan joined the room") ──────
        if (item.type === "system") {
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-6 py-2 my-1"
            >
              <div className="flex-1 h-px bg-gray-800/80" />
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {item.content}
              </span>
              <div className="flex-1 h-px bg-gray-800/80" />
            </div>
          );
        }

        // ── Day divider (e.g. "Today", "Yesterday") ────────────
        if (item.type === "divider") {
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-6 py-3 my-1"
            >
              <div className="flex-1 h-px bg-gray-700/50" />
              <span className="text-xs text-gray-400 font-semibold tracking-wide px-2">
                {item.content}
              </span>
              <div className="flex-1 h-px bg-gray-700/50" />
            </div>
          );
        }

        // ── Unread messages banner ──────────────────────────────
        if (item.type === "unread") {
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-6 py-2 my-1"
            >
              <div className="flex-1 h-px bg-red-500/40" />
              <span className="text-xs text-red-400 font-semibold tracking-wide px-2 whitespace-nowrap">
                New Messages
              </span>
              <div className="flex-1 h-px bg-red-500/40" />
            </div>
          );
        }

        // ── Regular message ─────────────────────────────────────
        const prev = messages[index - 1];
        // Show avatar when it's the first message or sender changed or prev wasn't a message
        const showAvatar =
          !prev || prev.type !== "message" || prev.userId !== item.userId;

        return (
          <MessageBubble key={item.id} message={item} showAvatar={showAvatar} />
        );
      })}

      {/* Scroll anchor */}
      <div ref={bottomRef} className="h-2" />
    </div>
  );
}
