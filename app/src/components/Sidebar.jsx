import { Home, MessageSquare, Hash, Bell, Settings } from "lucide-react";
import OnlineIndicator from "./OnlineIndicator";
import { currentUser } from "../data/sampleData";

const NAV_ITEMS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "rooms", icon: Hash, label: "Rooms" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "settings", icon: Settings, label: "Settings" },
];

/**
 * Sidebar — narrow icon-rail on the far left.
 * Props:
 *   activePage   — currently active page id
 *   onPageChange — callback(pageId) when a nav icon is clicked
 */
export default function Sidebar({ activePage, onPageChange }) {
  return (
    <div className="w-16 bg-gray-950 flex flex-col items-center py-4 border-r border-gray-800/50 shrink-0">
      {/* ── App logo ─────────────────────────────────────────── */}
      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-105 transition-transform duration-200 select-none">
        R
      </div>

      {/* ── Navigation icons ─────────────────────────────────── */}
      <nav className="flex flex-col items-center gap-1 flex-1 w-full px-3">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              title={label}
              className={`
                relative w-10 h-10 rounded-xl flex items-center justify-center
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-400 shadow-sm shadow-indigo-500/20"
                    : "text-gray-500 hover:text-gray-200 hover:bg-gray-800/80"
                }
              `}
            >
              {/* Active pill indicator on the left edge */}
              {isActive && (
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full" />
              )}
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </nav>

      {/* ── Current user avatar — click to open Profile ──────── */}
      <button
        onClick={() => onPageChange("profile")}
        title="Your Profile"
        className={`relative mt-2 group ${activePage === "profile" ? "ring-2 ring-indigo-500 rounded-full" : ""}`}
      >
        <div
          className={`
            w-8 h-8 rounded-full ${currentUser.color}
            flex items-center justify-center text-white text-xs font-semibold
            ring-2 ring-gray-800 group-hover:ring-indigo-500
            transition-all duration-200
          `}
        >
          {currentUser.initials}
        </div>
        <OnlineIndicator status={currentUser.status} />
      </button>
    </div>
  );
}
