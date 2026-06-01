/**
 * Badge — red unread-count pill.
 * Props:
 *   count — number (renders nothing when 0 or falsy)
 */
export default function Badge({ count }) {
  if (!count) return null;

  return (
    <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1 leading-none shrink-0">
      {count > 99 ? "99+" : count}
    </span>
  );
}
