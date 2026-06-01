/**
 * OnlineIndicator — colored dot showing user presence status.
 * Props:
 *   status    — 'online' | 'away' | 'offline'  (default 'online')
 *   className — optional extra classes
 */
export default function OnlineIndicator({ status = "online", className = "" }) {
  const colorMap = {
    online: "bg-green-400",
    away: "bg-yellow-400",
    offline: "bg-gray-500",
  };

  return (
    <span
      className={`
        absolute bottom-0 right-0
        w-2.5 h-2.5 rounded-full
        ${colorMap[status] ?? "bg-gray-500"}
        border-2 border-gray-900
        ${className}
      `}
    />
  );
}
