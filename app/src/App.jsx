import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import RoomList from "./components/RoomList";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import HomePage from "./pages/HomePage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { rooms } from "./data/sampleData";
import socket from "./socket";

export default function App() {
  const [activePage, setActivePage] = useState("rooms");
  const [activeRoomId, setActiveRoomId] = useState(1);
  const [showRoomList, setShowRoomList] = useState(false);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleIncomingMessage = (data) => {
      console.log("Received:", data);
    };

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, []);

  console.log("logged");




  function handleSendMessage() {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData?.email) return;

    console.log("called");

    socket.emit("chat message", userData.email);
  }



  const activeRoom = rooms.find((r) => r.id === activeRoomId);

  const handleRoomSelect = (id) => {


    setActiveRoomId(id);
    setShowRoomList(false);
  };

  // The "rooms" page is the main chat view — all others are full-screen pages
  const isChatView = activePage === "rooms";

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* ── Left Icon Rail ───────────────────────────────────── */}
      <div className="hidden md:flex shrink-0">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
      </div>

      {/* ── Page router ──────────────────────────────────────── */}
      {activePage === "home" && <HomePage />}
      {activePage === "messages" && <MessagesPage />}
      {activePage === "notifications" && <NotificationsPage />}
      {activePage === "settings" && <SettingsPage />}
      {activePage === "profile" && <ProfilePage />}

      {/* ── Chat view (rooms page) ───────────────────────────── */}
      {isChatView && (
        <>
          {/* Room List Panel — desktop inline, mobile overlay */}
          <div
            className={`shrink-0 ${showRoomList
              ? "fixed inset-y-0 left-0 z-30 flex shadow-2xl"
              : "hidden md:flex"
              }`}
          >
            <RoomList
              activeRoomId={activeRoomId}
              onRoomSelect={handleRoomSelect}
            />
          </div>

          {/* Mobile backdrop */}
          {showRoomList && (
            <div
              className="fixed inset-0 z-20 bg-black/60 md:hidden"
              onClick={() => setShowRoomList(false)}
            />
          )}

          <button onClick={handleSendMessage}>Click</button>

          {/* Chat area */}
          <div className="flex flex-col flex-1 min-w-0">
            <ChatHeader
              room={activeRoom}
              onMenuClick={() => setShowRoomList(true)}
            />
            <MessageList />
            <MessageInput roomName={activeRoom.name} />
          </div>
        </>
      )}
    </div>
  );
}
