import { useState } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import RoomItem from "./RoomItem";
import { rooms } from "../data/sampleData";

/**
 * RoomList — middle panel showing pinned and all rooms.
 * Props:
 *   activeRoomId — currently selected room id
 *   onRoomSelect — callback(roomId) when a room is clicked
 */
export default function RoomList({ activeRoomId, onRoomSelect }) {
  const [search, setSearch] = useState("");
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [allOpen, setAllOpen] = useState(true);

  const filtered = rooms.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );
  const pinnedRooms = filtered.filter((r) => r.pinned);
  const allRooms = filtered.filter((r) => !r.pinned);

  return (
    <div className="w-64 bg-gray-900 flex flex-col border-r border-gray-800/50 shrink-0 h-full">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="px-4 py-4 border-b border-gray-800/50 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-gray-100 font-semibold text-base tracking-tight">
            Relay
          </h1>
          <button
            title="New Room"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-gray-700 transition-all duration-150"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search rooms…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-gray-800 text-gray-300 text-sm rounded-lg
              py-1.5 pl-8 pr-3 placeholder-gray-600
              border border-gray-700/50
              focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* ── Scrollable room sections ─────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
        {/* Pinned Rooms */}
        {pinnedRooms.length > 0 && (
          <section>
            <SectionHeader
              label="Pinned Rooms"
              isOpen={pinnedOpen}
              onToggle={() => setPinnedOpen((v) => !v)}
            />
            {pinnedOpen && (
              <div className="space-y-0.5 mt-1">
                {pinnedRooms.map((room) => (
                  <RoomItem
                    key={room.id}
                    room={room}
                    isActive={activeRoomId === room.id}
                    onClick={() => onRoomSelect(room.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* All Rooms */}
        {allRooms.length > 0 && (
          <section>
            <SectionHeader
              label="All Rooms"
              isOpen={allOpen}
              onToggle={() => setAllOpen((v) => !v)}
            />
            {allOpen && (
              <div className="space-y-0.5 mt-1">
                {allRooms.map((room) => (
                  <RoomItem
                    key={room.id}
                    room={room}
                    isActive={activeRoomId === room.id}
                    onClick={() => onRoomSelect(room.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-xs text-gray-600 text-center py-4">
            No rooms found
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Small helper: collapsible section header ──────────────── */
function SectionHeader({ label, isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-2 py-1 w-full text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors duration-150"
    >
      <ChevronDown
        size={12}
        className={`transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`}
      />
      {label}
    </button>
  );
}
