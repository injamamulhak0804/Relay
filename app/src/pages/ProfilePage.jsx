import { useState } from "react";
import {
  Edit2,
  MapPin,
  Link2,
  Calendar,
  MessageSquare,
  Hash,
  Star,
  Grid,
  List,
} from "lucide-react";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import { currentUser, users, rooms, messages } from "../data/sampleData";

const TABS = ["Overview", "Activity", "Rooms"];

// Derive stats from sample data
const TOTAL_MESSAGES = messages.filter(
  (m) => m.type === "message" && m.userId === 1,
).length;
const TOTAL_ROOMS = rooms.filter((r) => r.members.includes(1)).length;

export default function ProfilePage() {
  const [tab, setTab] = useState("Overview");
  const [editStatus, setEdit] = useState(false);
  const [status, setStatus] = useState("Building something great 🚀");
  const [draftStatus, setDraft] = useState(status);

  const saveStatus = () => {
    setStatus(draftStatus);
    setEdit(false);
  };

  const userRooms = rooms.filter((r) => r.members.includes(currentUser.id));

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950 min-w-0">
      {/* ── Cover banner ──────────────────────────────────────── */}
      <div className="h-36 bg-linear-to-r from-indigo-900/60 via-violet-900/40 to-gray-900 relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
          }}
        />
      </div>

      {/* ── Profile header ────────────────────────────────────── */}
      <div className="px-6 pb-0 -mt-10 relative">
        <div className="flex items-end justify-between">
          {/* Avatar */}
          <div className="ring-4 ring-gray-950 rounded-full">
            <div
              className={`w-20 h-20 rounded-full ${currentUser.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
            >
              {currentUser.initials}
            </div>
          </div>

          {/* Edit button */}
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 border border-gray-700/70 rounded-xl hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/5 transition-all mt-12">
            <Edit2 size={14} />
            Edit Profile
          </button>
        </div>

        {/* Name + handle */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-100">
              {currentUser.name}
            </h1>
            <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-medium">
              Online
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            @{currentUser.name.toLowerCase()}
          </p>

          {/* Status */}
          <div className="mt-2">
            {editStatus ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={draftStatus}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveStatus();
                    if (e.key === "Escape") setEdit(false);
                  }}
                  className="bg-gray-800 border border-indigo-500/60 rounded-lg px-3 py-1 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 w-72"
                />
                <button
                  onClick={saveStatus}
                  className="px-3 py-1 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-400 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="px-3 py-1 text-gray-400 text-xs rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setDraft(status);
                  setEdit(true);
                }}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors group flex items-center gap-1"
              >
                {status}
                <Edit2
                  size={11}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> San Francisco, CA
            </span>
            <span className="flex items-center gap-1">
              <Link2 size={12} /> relay.app/alex
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> Joined Jan 2024
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mt-4 pb-0">
          {[
            { label: "Messages", value: TOTAL_MESSAGES },
            { label: "Rooms", value: TOTAL_ROOMS },
            { label: "Reactions", value: 28 },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-lg font-bold text-gray-100">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="px-6 mt-5 border-b border-gray-800/60">
        <div className="flex items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-150 ${
                tab === t
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ───────────────────────────────────────── */}
      <div className="px-6 py-5">
        {tab === "Overview" && <OverviewTab />}
        {tab === "Activity" && <ActivityTab />}
        {tab === "Rooms" && <RoomsTab userRooms={userRooms} />}
      </div>
    </div>
  );
}

/* ── Overview tab ────────────────────────────────────────── */
function OverviewTab() {
  const teamMembers = Object.values(users).filter((u) => u.id !== 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* About */}
      <div className="bg-gray-900 border border-gray-800/60 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-100 mb-3">About</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Full-stack engineer passionate about building great products and
          developer tooling. Love clean code, thoughtful design, and strong
          coffee ☕
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["React", "TypeScript", "Node.js", "Design Systems", "APIs"].map(
            (skill) => (
              <span
                key={skill}
                className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Teammates */}
      <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800/50">
          <h3 className="text-sm font-semibold text-gray-100">Teammates</h3>
        </div>
        <ul className="divide-y divide-gray-800/50">
          {teamMembers.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-800/40 transition-colors cursor-pointer"
            >
              <div className="relative">
                <Avatar user={user} size="sm" />
                <span
                  className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-gray-900 ${
                    user.status === "online"
                      ? "bg-green-400"
                      : user.status === "away"
                        ? "bg-yellow-400"
                        : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.status}
                </p>
              </div>
              <button className="p-1.5 text-gray-500 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition-all">
                <MessageSquare size={13} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Activity tab ────────────────────────────────────────── */
function ActivityTab() {
  const myMessages = messages.filter(
    (m) => m.type === "message" && m.userId === 1,
  );

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Recent Messages
      </p>
      {myMessages.map((msg) => (
        <div
          key={msg.id}
          className="flex items-start gap-3 bg-gray-900 border border-gray-800/60 rounded-xl px-4 py-3 hover:border-gray-700 transition-colors"
        >
          <Avatar user={currentUser} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-medium text-gray-100">
                {currentUser.name}
              </span>
              <span className="text-xs text-gray-500">
                in <span className="text-indigo-400">#general</span>
              </span>
              <span className="text-xs text-gray-600 ml-auto">
                {msg.timestamp}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {msg.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Rooms tab ───────────────────────────────────────────── */
function RoomsTab({ userRooms }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {userRooms.map((room) => (
        <div
          key={room.id}
          className="bg-gray-900 border border-gray-800/60 rounded-xl p-4 hover:border-gray-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-indigo-400 font-medium">#</span>
            <span className="text-sm font-semibold text-gray-100">
              {room.name}
            </span>
            {room.unread > 0 && <Badge count={room.unread} />}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {room.description}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="flex -space-x-1.5">
              {room.members.slice(0, 3).map((uid) => (
                <div key={uid} className="ring-2 ring-gray-900 rounded-full">
                  <Avatar user={users[uid]} size="xs" />
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {room.members.length} members
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
