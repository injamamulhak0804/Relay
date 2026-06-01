import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Moon,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Avatar from "../components/Avatar";
import { currentUser } from "../data/sampleData";

const SECTIONS = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "language", label: "Language", icon: Globe },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [toggles, setToggles] = useState({
    desktopNotifs: true,
    soundAlerts: false,
    mentionsOnly: false,
    darkMode: true,
    compactMode: false,
    twoFactor: false,
    readReceipts: true,
    onlineStatus: true,
  });

  const toggle = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-1 min-w-0 overflow-hidden bg-gray-950">
      {/* ── Settings nav ────────────────────────────────────── */}
      <div className="w-56 bg-gray-900 border-r border-gray-800/50 flex flex-col shrink-0 py-4 px-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Settings
        </p>
        <nav className="space-y-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                activeSection === id
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-gray-400 hover:bg-gray-800/70 hover:text-gray-200"
              }`}
            >
              <Icon size={16} />
              {label}
              {activeSection === id && (
                <ChevronRight size={14} className="ml-auto text-indigo-400" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Settings content ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 min-w-0">
        {activeSection === "account" && (
          <AccountSettings toggles={toggles} toggle={toggle} />
        )}
        {activeSection === "appearance" && (
          <AppearanceSettings toggles={toggles} toggle={toggle} />
        )}
        {activeSection === "notifications" && (
          <NotificationSettings toggles={toggles} toggle={toggle} />
        )}
        {activeSection === "privacy" && (
          <PrivacySettings toggles={toggles} toggle={toggle} />
        )}
        {activeSection === "language" && <LanguageSettings />}
      </div>
    </div>
  );
}

/* ── Reusable primitives ─────────────────────────────────── */

function SectionTitle({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-100">{title}</h2>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden mb-4">
      {children}
    </div>
  );
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-800/50 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-200">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
        value ? "bg-indigo-500" : "bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          value ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ── Account section ─────────────────────────────────────── */
function AccountSettings() {
  const [name, setName] = useState(currentUser.name);
  const [status, setStatus] = useState("Building something great 🚀");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <SectionTitle
        title="Account"
        description="Manage your profile and personal information."
      />

      {/* Avatar */}
      <Card>
        <div className="flex items-center gap-5 p-5">
          <div className="relative">
            <Avatar user={currentUser} size="lg" />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 transition-colors shadow-md">
              <User size={12} />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-100">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Click the icon to change your avatar
            </p>
          </div>
        </div>
      </Card>

      {/* Profile fields */}
      <Card>
        <SettingRow
          label="Display Name"
          description="This is how others see you in Relay."
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-40 bg-gray-800 border border-gray-700/60 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </SettingRow>
        <SettingRow
          label="Status"
          description="A short message visible to your teammates."
        >
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-52 bg-gray-800 border border-gray-700/60 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </SettingRow>
        <SettingRow
          label="Email"
          description="Used for login and notifications."
        >
          <span className="text-sm text-gray-400">alex@relay.app</span>
        </SettingRow>
      </Card>

      <button
        onClick={save}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          saved
            ? "bg-green-500 text-white"
            : "bg-indigo-500 hover:bg-indigo-400 text-white"
        }`}
      >
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </>
  );
}

/* ── Appearance section ──────────────────────────────────── */
function AppearanceSettings({ toggles, toggle }) {
  const THEMES = ["Default Dark", "Midnight", "Slate", "Navy"];
  const [theme, setTheme] = useState("Default Dark");

  return (
    <>
      <SectionTitle
        title="Appearance"
        description="Customize how Relay looks and feels."
      />
      <Card>
        <SettingRow label="Dark Mode" description="Use the dark color scheme.">
          <Toggle
            value={toggles.darkMode}
            onChange={() => toggle("darkMode")}
          />
        </SettingRow>
        <SettingRow
          label="Compact Mode"
          description="Reduce message spacing for a denser layout."
        >
          <Toggle
            value={toggles.compactMode}
            onChange={() => toggle("compactMode")}
          />
        </SettingRow>
      </Card>

      <Card>
        <div className="p-5">
          <p className="text-sm font-medium text-gray-200 mb-3">Theme</p>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                  theme === t
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                    : "border-gray-700/60 text-gray-400 hover:border-gray-600"
                }`}
              >
                <Moon size={14} />
                {t}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}

/* ── Notifications section ───────────────────────────────── */
function NotificationSettings({ toggles, toggle }) {
  return (
    <>
      <SectionTitle
        title="Notifications"
        description="Choose how and when you want to be notified."
      />
      <Card>
        <SettingRow
          label="Desktop Notifications"
          description="Show notifications on your desktop."
        >
          <Toggle
            value={toggles.desktopNotifs}
            onChange={() => toggle("desktopNotifs")}
          />
        </SettingRow>
        <SettingRow
          label="Sound Alerts"
          description="Play a sound for new messages."
        >
          <Toggle
            value={toggles.soundAlerts}
            onChange={() => toggle("soundAlerts")}
          />
        </SettingRow>
        <SettingRow
          label="Mentions Only"
          description="Only notify me when someone mentions me."
        >
          <Toggle
            value={toggles.mentionsOnly}
            onChange={() => toggle("mentionsOnly")}
          />
        </SettingRow>
      </Card>
    </>
  );
}

/* ── Privacy section ─────────────────────────────────────── */
function PrivacySettings({ toggles, toggle }) {
  return (
    <>
      <SectionTitle
        title="Privacy & Security"
        description="Control your data and account security."
      />
      <Card>
        <SettingRow
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account."
        >
          <Toggle
            value={toggles.twoFactor}
            onChange={() => toggle("twoFactor")}
          />
        </SettingRow>
        <SettingRow
          label="Read Receipts"
          description="Let others know when you've read their messages."
        >
          <Toggle
            value={toggles.readReceipts}
            onChange={() => toggle("readReceipts")}
          />
        </SettingRow>
        <SettingRow
          label="Show Online Status"
          description="Let teammates see when you're active."
        >
          <Toggle
            value={toggles.onlineStatus}
            onChange={() => toggle("onlineStatus")}
          />
        </SettingRow>
      </Card>

      <Card>
        <div className="p-5 space-y-3">
          <p className="text-sm font-medium text-gray-200">Danger Zone</p>
          <button className="px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all">
            Delete Account
          </button>
        </div>
      </Card>
    </>
  );
}

/* ── Language section ────────────────────────────────────── */
function LanguageSettings() {
  const LANGUAGES = [
    "English (US)",
    "English (UK)",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Portuguese",
    "Chinese (Simplified)",
  ];
  const [selected, setSelected] = useState("English (US)");

  return (
    <>
      <SectionTitle
        title="Language & Region"
        description="Set your preferred language and timezone."
      />
      <Card>
        <div className="p-5 space-y-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelected(lang)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${
                selected === lang
                  ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                  : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 border border-transparent"
              }`}
            >
              {lang}
              {selected === lang && (
                <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="white" className="w-2.5 h-2.5">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}
