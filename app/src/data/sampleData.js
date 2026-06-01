// ─── Users ───────────────────────────────────────────────────────────────────
export const currentUser = {
  id: 1,
  name: "Alex",
  initials: "AL",
  color: "bg-indigo-500",
  status: "online",
};

export const users = {
  1: {
    id: 1,
    name: "Alex",
    initials: "AL",
    color: "bg-indigo-500",
    status: "online",
  },
  2: {
    id: 2,
    name: "Sarah",
    initials: "SA",
    color: "bg-violet-500",
    status: "online",
  },
  3: {
    id: 3,
    name: "Jordan",
    initials: "JO",
    color: "bg-emerald-500",
    status: "away",
  },
  4: {
    id: 4,
    name: "Mike",
    initials: "MI",
    color: "bg-amber-500",
    status: "offline",
  },
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
export const rooms = [
  {
    id: 1,
    name: "general",
    description: "General discussions for the whole team",
    pinned: true,
    unread: 3,
    lastMessage: "Hey everyone! How's it going?",
    lastTime: "2m ago",
    members: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "design",
    description: "Design system, UI/UX, and brand discussions",
    pinned: true,
    unread: 0,
    lastMessage: "Reviewed the new mockups — looking great!",
    lastTime: "15m ago",
    members: [1, 2, 3],
  },
  {
    id: 3,
    name: "backend",
    description: "Backend engineering, APIs, and infrastructure",
    pinned: false,
    unread: 7,
    lastMessage: "Fixed the auth bug finally!",
    lastTime: "1h ago",
    members: [1, 3, 4],
  },
  {
    id: 4,
    name: "random",
    description: "Random stuff, memes, and off-topic fun",
    pinned: false,
    unread: 0,
    lastMessage: "lol that's hilarious 😂",
    lastTime: "2h ago",
    members: [1, 2, 4],
  },
  {
    id: 5,
    name: "announcements",
    description: "Important team announcements — read only",
    pinned: false,
    unread: 1,
    lastMessage: "Team sync at 3pm today",
    lastTime: "3h ago",
    members: [1, 2, 3, 4],
  },
];

// ─── Messages ─────────────────────────────────────────────────────────────────
export const messages = [
  {
    id: 1,
    type: "message",
    userId: 1,
    content: "Good morning everyone! Ready for another productive day? 🚀",
    timestamp: "9:00 AM",
  },
  {
    id: 2,
    type: "system",
    content: "Sarah joined the room",
    timestamp: "9:05 AM",
  },
  {
    id: 3,
    type: "message",
    userId: 2,
    content: "Morning Alex! Yes, super excited about today's sprint planning.",
    timestamp: "9:06 AM",
  },
  {
    id: 4,
    type: "message",
    userId: 1,
    content: "Perfect. I've already set up the agenda — should be a quick one!",
    timestamp: "9:07 AM",
  },
  {
    id: 5,
    type: "message",
    userId: 3,
    content: "Hey folks! Just jumped in. What did I miss?",
    timestamp: "9:15 AM",
  },
  {
    id: 6,
    type: "message",
    userId: 2,
    content: "Just getting started on sprint planning! Nothing major yet 😄",
    timestamp: "9:16 AM",
  },
  {
    id: 7,
    type: "message",
    userId: 4,
    content: "Morning team 👋",
    timestamp: "9:20 AM",
  },
  {
    id: 8,
    type: "message",
    userId: 4,
    content:
      "I finished the backend API changes last night. Should be ready for review.",
    timestamp: "9:20 AM",
  },
  {
    id: 9,
    type: "message",
    userId: 4,
    content: "Here's the PR link: github.com/relay/backend#142",
    timestamp: "9:21 AM",
  },
  {
    id: 10,
    type: "divider",
    content: "Today",
  },
  {
    id: 11,
    type: "unread",
  },
  {
    id: 12,
    type: "message",
    userId: 1,
    content: "Great work Mike! I'll review it this morning.",
    timestamp: "10:30 AM",
  },
  {
    id: 13,
    type: "message",
    userId: 2,
    content:
      "Me too. The design team needs the API stable before we can test the new UI components.",
    timestamp: "10:32 AM",
  },
  {
    id: 14,
    type: "message",
    userId: 3,
    content:
      "Has anyone looked at the performance metrics from last week? Numbers look really promising 📈",
    timestamp: "10:45 AM",
  },
  {
    id: 15,
    type: "message",
    userId: 1,
    content:
      "Yes! We're seeing a 40% improvement in load times. Really proud of what everyone's accomplished here.",
    timestamp: "10:47 AM",
  },
];
