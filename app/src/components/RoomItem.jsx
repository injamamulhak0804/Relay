import Badge from "./Badge";

/**
 * RoomItem — a single row in the room list panel.
 * Props:
 *   room     — room object from sampleData
 *   isActive — boolean, highlights the row when true
 *   onClick  — callback when the row is clicked
 */
export default function RoomItem({ room, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
        transition-all duration-150 group
        ${
          isActive
            ? "bg-indigo-500/15 text-indigo-200"
            : "text-gray-400 hover:bg-gray-800/70 hover:text-gray-200"
        }
      `}
    >
      {/* # prefix */}
      <span
        className={`text-sm shrink-0 font-medium
          ${isActive ? "text-indigo-400" : "text-gray-600 group-hover:text-gray-400"}`}
      >
        #
      </span>

      {/* Room info */}
      <div className="flex-1 min-w-0">
        {/* Name + time */}
        <div className="flex items-center justify-between gap-1">
          <span
            className={`text-sm font-medium truncate ${isActive ? "text-indigo-100" : ""}`}
          >
            {room.name}
          </span>
          <span className="text-xs text-gray-500 shrink-0">
            {room.lastTime}
          </span>
        </div>

        {/* Last message + badge */}
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <span className="text-xs text-gray-500 truncate">
            {room.lastMessage}
          </span>
          <Badge count={room.unread} />
        </div>
      </div>
    </button>
  );
}
