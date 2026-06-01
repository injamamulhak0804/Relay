import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import TypingIndicator from "./TypingIndicator";

/**
 * MessageInput — the bottom input bar with attachment/emoji/send controls.
 * Props:
 *   roomName — name of the active room (for placeholder text)
 */
export default function MessageInput({ roomName }) {
  const [message, setMessage] = useState("");
  const hasText = message.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    // In a real app, this would dispatch the message to a server/context
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-3 bg-gray-900 border-t border-gray-800/50 shrink-0">
      {/* Typing indicator */}
      <TypingIndicator user="zamam" />

      {/* ── Input box ─────────────────────────────────────────── */}
      <div
        className="
          flex items-center gap-2 mt-1
          bg-gray-800 rounded-xl px-3 py-2.5
          border border-gray-700/50
          focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/30
          transition-all duration-200
        "
      >
        {/* Left icon actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            title="Attach file"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-gray-700 transition-all duration-150"
          >
            <Paperclip size={15} />
          </button>
          <button
            title="Emoji"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:bg-gray-700 transition-all duration-150"
          >
            <Smile size={15} />
          </button>
        </div>

        {/* Text input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${roomName}`}
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none min-w-0"
        />

        {/* Send button — glows when there's text */}
        <button
          onClick={handleSend}
          disabled={!hasText}
          title="Send message"
          className={`
            w-7 h-7 rounded-lg flex items-center justify-center shrink-0
            transition-all duration-200
            ${
              hasText
                ? "bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/40 scale-105 cursor-pointer"
                : "text-gray-600 cursor-not-allowed"
            }
          `}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
