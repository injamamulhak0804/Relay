import { Search, Pin, Users, Settings, Menu } from "lucide-react";
import Avatar from "./Avatar";
import { users } from "../data/sampleData";

/**
 * ChatHeader — top bar for the active chat room.
 * Props:
 *   room        — the active room object
 *   onMenuClick — callback to open the room list on mobile
 */
export default function ChatHeader({ room, onMenuClick }) {
  const members = room.members.map((id) => users[id]);
  const ACTION_ICONS = [Search, Pin, Users, Settings];

  return (
    <div className="h-14 bg-gray-900 border-b border-gray-800/50 px-4 flex items-center justify-between shrink-0 shadow-sm">
      {/* ── Left: hamburger (mobile) + room name ──────────────── */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-all"
        >
          <Menu size={18} />
        </button>

        {/* Channel icon + name */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-gray-500 text-2xl font-light">#</span>
          <div className="min-w-0">
            <h2 className="text-gray-100 font-semibold text-start text-sm leading-tight">
              {room.name}
            </h2>
            <p className="text-xs text-gray-500 leading-tight truncate hidden sm:block max-w-xs">
              {room.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: stacked avatars + action icons ─────────────── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Stacked member avatars */}
        <div className="hidden sm:flex items-center">
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((user) => (
              <div key={user.id} className="ring-2 ring-gray-900 rounded-full">
                <Avatar user={user} size="xs" />
              </div>
            ))}
            {members.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
                +{members.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {members.length} members
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-gray-700/50" />

        {/* Action icon buttons */}
        <div className="flex items-center gap-0.5">
          {ACTION_ICONS.map((Icon, i) => (
            <button
              key={i}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-all duration-150"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
