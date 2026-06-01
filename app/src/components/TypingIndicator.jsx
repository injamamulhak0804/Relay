/**
 * TypingIndicator — animated three-dot indicator with user name.
 * Props:
 *   user — name of the person typing (string)
 */
export default function TypingIndicator({ user }) {
  return (
    <div className="flex items-center gap-2 px-1 py-0.5 text-xs text-gray-400">
      {/* Bouncing dots */}
      <div className="flex items-center gap-0.75">
        <span
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms", animationDuration: "900ms" }}
        />
        <span
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms", animationDuration: "900ms" }}
        />
        <span
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms", animationDuration: "900ms" }}
        />
      </div>

      <span>
        <strong className="font-semibold text-gray-300">{user}</strong> is
        typing…
      </span>
    </div>
  );
}
