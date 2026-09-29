"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { spacing, typography, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme, ThemeProvider } from "../../context/ThemeContext";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

// ─── Mock user ────────────────────────────────────────────────────────────────


const TABS = ["Profile", "Personal"];

// ─── Micro icons ──────────────────────────────────────────────────────────────
const Icon = {
  back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  eyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
  camera: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  check: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  spin: () => <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>,
  warn: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  flame: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>,
  bolt: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  profile: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  personal: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
};

const TAB_ICONS = { Profile: <Icon.profile />, Personal: <Icon.personal />, Password: <Icon.lock /> };

// ─── Shared input ─────────────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, hint, disabled, icon }) {
  const { dark, textColor } = useTheme();
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: textColor }}>{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">{icon}</span>}
        <input
          type={isPwd && show ? "text" : type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl border text-sm outline-none transition-all duration-200 ${icon ? "pl-10" : "pl-4"} pr-4 py-3 ${disabled ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed" : `bg-gray-50/70 border-gray-200 ${dark ? "text-gray-100" : "text-gray-900"} focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 focus:shadow-sm`} ${isPwd ? "pr-11" : ""}`}
          style={{ 
            backgroundColor: dark ? "#1f2937" : undefined, 
            borderColor: dark ? "#374151" : undefined,
          }}
        />
        {isPwd && (
          <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors">
            {show ? <Icon.eyeOff /> : <Icon.eye />}
          </button>
        )}
      </div>
      {hint && <p className="text-[11px]" style={{ color: textColor }}>{hint}</p>}
    </div>
  );
}

// ─── Password strength ────────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const { dark } = useTheme();
  if (!password) return null;
  const score = password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 3 : password.length >= 8 ? 2 : 1;
  const map = { 1: ["bg-red-400", "text-red-500", "Weak"], 2: ["bg-amber-400", "text-amber-500", "Fair"], 3: ["bg-emerald-400", "text-emerald-500", "Strong"] };
  const [barColor, textColor, label] = map[score];
  return (
    <div className="space-y-1.5 pt-0.5">
      <div className="flex gap-1">
        {[1, 2, 3].map(i => <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= score ? barColor : "bg-gray-100 dark:bg-gray-700"}`} />)}
      </div>
      <p className={`text-[11px] font-semibold ${textColor}`}>{label} password</p>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ icon, value, label }) {
  const { dark } = useTheme();
  return (
    <div className={`flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl border min-w-[70px] ${dark ? "bg-gray-800 border-gray-700" : "bg-white/70 border-purple-100"}`}>
      <span className="text-primary">{icon}</span>
      <span className="text-sm font-bold" style={{ color: dark ? "#f9fafb" : "#111827" }}>{value}</span>
      <span className="text-[9px] uppercase tracking-wide font-semibold" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{label}</span>
    </div>
  );
}

// ─── Element badge ────────────────────────────────────────────────────────────
const ELEMENT_CONFIG = {
  Ether: { color: "from-violet-400 to-purple-600", label: "✦", textColor: "text-violet-600", bgColor: "bg-violet-50", borderColor: "border-violet-200" },
  Air: { color: "from-sky-300 to-blue-500", label: "◇", textColor: "text-sky-600", bgColor: "bg-sky-50", borderColor: "border-sky-200" },
  Fire: { color: "from-orange-400 to-red-500", label: "△", textColor: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  Water: { color: "from-teal-400 to-cyan-600", label: "▽", textColor: "text-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
  Earth: { color: "from-green-400 to-emerald-600", label: "□", textColor: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
};

// ─── Tab: Profile ─────────────────────────────────────────────────────────────
function ProfilePanel({
  user,
  avatarPreview,
  setAvatarPreview,
  setPhotoFile,
  setPhotoChanged,
  name,
  setName,
  bio,
  setBio,
}) {
  const { dark, textColor } = useTheme();
  const fileRef = useRef();
  const elem = ELEMENT_CONFIG[user.element] || ELEMENT_CONFIG.Ether;

  return (
    <div className="space-y-6">
      {/* Hero identity card */}
      <div className={`relative rounded-2xl overflow-hidden border ${dark ? "border-gray-700" : "border-purple-100"}`}>
        {/* Gradient top band */}
        <div className="h-20 bg-gradient-to-r from-[#9A85FE]/80 to-[#c4b8ff]/50" />

        {/* Avatar pulled up */}
        <div className="px-6 pb-5">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="relative group cursor-pointer shrink-0" onClick={() => fileRef.current.click()}>
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-400 text-white font-bold text-2xl flex items-center justify-center overflow-hidden ring-4 ${dark ? "ring-gray-800" : "ring-white"} shadow-lg`}>
                {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : user.initials}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon.camera />
              </div>
              {/* Element dot */}
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${elem.color} shadow-md`} />
            </div>

            <div className="pb-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold truncate" style={{ color: dark ? "#f9fafb" : "#111827" }}>{name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${elem.bgColor} ${elem.textColor} ${elem.borderColor}`}>
                  {elem.label} {user.element}
                </span>
              </div>
              <p className="text-xs" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>{user.email}</p>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: textColor }}>{user.level}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            <StatPill icon={<Icon.flame />} value={`${user.streakDays}d`} label="Streak" />
            <StatPill icon={<Icon.bolt />} value={user.sessionsCompleted} label="Sessions" />
            <div className={`flex flex-col items-start justify-center px-4 py-2.5 rounded-xl border flex-1 min-w-[120px] ${dark ? "bg-gray-800 border-gray-700" : "bg-white/70 border-purple-100"}`}>
              <span className="text-[9px] uppercase tracking-wide font-semibold" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>Next session</span>
              <span className="text-xs font-semibold mt-0.5 leading-tight" style={{ color: dark ? "#f9fafb" : "#374151" }}>{user.nextSession}</span>
            </div>
          </div>
        </div>

       <input
  ref={fileRef}
  type="file"
  accept="image/jpeg,image/png,image/jpg"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional 2 MB validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Profile image must be less than 2 MB.");
      return;
    }

    setPhotoFile(file);
    setPhotoChanged(true);

    // Preview selected image
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  }}
/>
      </div>

      {/* Upload controls */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => fileRef.current.click()} 
          className="text-xs font-semibold border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors" 
        >
          Upload photo
        </button>
        {avatarPreview && (
          <button 
            onClick={() => setAvatarPreview(null)} 
            className="text-xs px-3 py-2 border border-gray-200 rounded-lg transition-colors" 
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
          >
            Remove
          </button>
        )}
        <span className="text-[11px]" style={{ color: dark ? "#9ca3af" : "#6b7280" , color: textColor }}>JPG or PNG · max 2 MB</span>
      </div>

      <Field label="Display Name" value={name} onChange={setName} placeholder="Your full name" />

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: dark ? "#9ca3af" : "#6b7280" , color: textColor }}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          maxLength={180}
          placeholder="Share a little about your practice…"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 resize-none ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-50/70 border-gray-200"}`}
          style={{ 
            backgroundColor: dark ? "#1f2937" : undefined, 
            borderColor: dark ? "#374151" : undefined,
            color: dark ? "#f9fafb" : "#111827"
          }}
        />
        <div className="flex justify-between items-center">
          <p className="text-[11px]" style={{ color: dark ? "#9ca3af" : "#6b7280", color: textColor  }}>Shown on your public mudra profile</p>
          <p className="text-[11px]" style={{ color: dark ? "#9ca3af" : "#6b7280" , color: textColor }}>{bio.length}/180</p>
        </div>
      </div>

      {/* Primary element selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: dark ? "#9ca3af" : "#6b7280", color: textColor  }}>Primary Element</label>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(ELEMENT_CONFIG).map(([el, cfg]) => (
            <button 
              key={el} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${user.element === el ? `${cfg.bgColor} ${cfg.textColor} ${cfg.borderColor}` : dark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"}`}
              style={user.element !== el ? { color: dark ? "#9ca3af" : "#6b7280", color: textColor  } : {}}
            >
              <span>{cfg.label}</span> {el}
            </button>
          ))}
        </div>
        <p className="text-[11px]" style={{ color: dark ? "#9ca3af" : "#6b7280", color: textColor  }}>Personalises your mudra and session recommendations</p>
      </div>
    </div>
  );
}

// ─── Tab: Personal ────────────────────────────────────────────────────────────
function PersonalPanel({ email, setEmail, phone, setPhone, dob, setDob }) {
  const { dark, textColor } = useTheme(); // ← Added textColor here
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Contact</p>
        <Field label="Email address" type="email" value={email} onChange={setEmail} hint="Your login email — verified" />
        <Field label="Phone number" type="tel" value={phone} onChange={setPhone} hint="For SMS session reminders (optional)" />
      </div>

      <div className={`h-px ${dark ? "bg-gray-700" : "bg-gray-100"}`} />

      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Identity</p>
        <Field label="Date of birth" type="date" value={dob} onChange={setDob} hint="Used to personalise age-appropriate practices" />
      </div>

      <div className={`h-px ${dark ? "bg-gray-700" : "bg-gray-100"}`} />

      {/* Data & privacy mini section */}
      <div className={`rounded-xl border p-4 space-y-3 ${dark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50/60"}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Data & Privacy</p>
        {[
          { label: "Session history", desc: "Store completed sessions and streaks", on: true },
          { label: "Personalised recommendations", desc: "Use your practice data to suggest mudras", on: true },
          { label: "Marketing emails", desc: "Newsletters and new feature announcements", on: false },
        ].map(({ label, desc, on }) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: textColor }}>{label}</p>
              <p className="text-[11px]" style={{ color: dark ? "#6b7280" : "#6b7280" }}>{desc}</p>
            </div>
            <div className={`w-10 h-5 rounded-full flex items-center transition-colors cursor-pointer ${on ? "bg-primary justify-end" : dark ? "bg-gray-600 justify-start" : "bg-gray-200 justify-start"}`}>
              <div className="w-4 h-4 rounded-full bg-white shadow mx-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ─── Tab: Password ────────────────────────────────────────────────────────────
// function PasswordPanel({ current, setCurrent, next, setNext, confirm, setConfirm }) {
//   const { dark } = useTheme();
//   const mismatch = confirm && next && next !== confirm;
//   const reqs = [
//     { label: "At least 8 characters", met: next.length >= 8 },
//     { label: "Uppercase letter", met: /[A-Z]/.test(next) },
//     { label: "Number", met: /[0-9]/.test(next) },
//     { label: "Special character", met: /[^a-zA-Z0-9]/.test(next) },
//   ];

//   return (
//     <div className="space-y-6">
//       <Field label="Current password" type="password" value={current} onChange={setCurrent} placeholder="Enter current password" />

//       <div className={`h-px ${dark ? "bg-gray-700" : "bg-gray-100"}`} />

//       <div className="space-y-3">
//         <Field label="New password" type="password" value={next} onChange={setNext} placeholder="At least 8 characters" />
//         {next && <PasswordStrength password={next} />}
//       </div>

//       {/* Requirements checklist */}
//       {next && (
//         <div className={`rounded-xl border p-4 space-y-2 ${dark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50/60"}`}>
//           <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Requirements</p>
//           {reqs.map(({ label, met }) => (
//             <div key={label} className="flex items-center gap-2">
//               <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${met ? "bg-emerald-100 text-emerald-500" : dark ? "bg-gray-700 text-gray-500" : "bg-gray-100 text-gray-300"}`}>
//                 <Icon.check />
//               </div>
//               <span className="text-xs transition-colors" style={{ color: met ? (dark ? "#e5e7eb" : "#374151") : (dark ? "#6b7280" : "#9ca3af") }}>{label}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="space-y-1.5">
//         <Field label="Confirm new password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat new password" />
//         {mismatch && (
//           <p className="text-xs text-red-500 flex items-center gap-1.5">
//             <Icon.warn /> Passwords don't match
//           </p>
//         )}
//         {confirm && !mismatch && next && (
//           <p className="text-xs text-emerald-500 flex items-center gap-1.5">
//             <Icon.check /> Passwords match
//           </p>
//         )}
//       </div>

//     </div>
//   );
// }

// ─── Page ─────────────────────────────────────────────────────────────────────
function EditProfileContent() {
  const router = useRouter();
  const { dark, textColor } = useTheme();

  const [activeTab, setActiveTab] = useState("Profile");
  const [saveState, setSaveState] = useState("idle");
  const [mounted, setMounted] = useState(false);

  // Actual logged-in user
const [authUser, setAuthUser] = useState(null);

const [avatarPreview, setAvatarPreview] = useState(null);
const [photoFile, setPhotoFile] = useState(null);
const [photoChanged, setPhotoChanged] = useState(false);
const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    setMounted(true);

    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        router.push("/login");
        return;
      }

      const parsedUser = JSON.parse(userData);

      setAuthUser(parsedUser);

      // Bind API/auth response values
      setName(parsedUser.fullName || parsedUser.username || "");
      setBio(parsedUser.bio || "");
      setEmail(parsedUser.email || "");
      setPhone(parsedUser.phone || "");
      setDob(parsedUser.dob || "");

      // Build profile image URL
      const imageBaseUrl =
        process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

      const profileImage =
        parsedUser.profileImage?.formats?.medium?.url
          ? `${imageBaseUrl}${parsedUser.profileImage.formats.medium.url}`
          : parsedUser.profileImage?.formats?.small?.url
            ? `${imageBaseUrl}${parsedUser.profileImage.formats.small.url}`
            : parsedUser.profileImage?.url
              ? `${imageBaseUrl}${parsedUser.profileImage.url}`
              : null;

      const avatar =
        profileImage ||
        parsedUser.googleProfileImage ||
        null;

      setAvatarPreview(avatar);

    } catch (error) {
      console.error("Failed to load user:", error);
      router.push("/login");
    }
  }, [router]);
const uploadProfileImage = async () => {
  if (!photoFile) return null;

  const filename = photoFile.name || `profile_${Date.now()}.jpg`;

  const formData = new FormData();

  formData.append("profileImage", photoFile, filename);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${apiBaseUrl}/users/upload-profile-image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const uploaded =
    res?.data?.data?.id ??
    res?.data?.id ??
    res?.data?.data?.[0]?.id ??
    null;

  console.log("UPLOAD_IMAGE_EXTRACTED_ID:", uploaded);

  return uploaded;
};
 const handleSave = async () => {
  if (!name.trim()) {
    alert("Name is required");
    return;
  }

  try {
    setSaveState("saving");

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      router.push("/login");
      return;
    }

    // -----------------------------------------
    // 1. Upload profile image if changed
    // -----------------------------------------

    let profileImageId = null;

    if (photoChanged && photoFile) {
      try {
        setUploadingPhoto(true);

        const uploadedId = await uploadProfileImage();

        if (uploadedId) {
          profileImageId = uploadedId;
        }
      } catch (uploadErr) {
        console.error(
          "Profile image upload failed:",
          uploadErr?.response?.data ||
            uploadErr?.message ||
            uploadErr
        );

        alert(
          "We could not upload your new photo. Your other changes will still be saved."
        );
      } finally {
        setUploadingPhoto(false);
      }
    }

    // -----------------------------------------
    // 2. Get user ID
    // -----------------------------------------

    const userId =
      authUser?.documentId ||
      authUser?.id;

    if (!userId) {
      throw new Error("User ID not found");
    }

    // -----------------------------------------
    // 3. Update profile
    // -----------------------------------------

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const url =
      `${apiBaseUrl}/users/update/${userId}`;

    const payload = {
      username: authUser?.username || "",
      fullName: name,
      phoneNumber: phone,
      dob: dob,
      bio: bio,
    };

    if (profileImageId) {
      payload.profileImage = profileImageId;
    }

    console.log("UPDATE PROFILE PAYLOAD:", payload);

    const res = await axios.put(
      url,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "UPDATE PROFILE RESPONSE:",
      res.data
    );

    // -----------------------------------------
    // 4. Get UPDATED USER
    // -----------------------------------------

    if (res?.data?.success === true) {
      const responseUser =
        res?.data?.data?.data;

      if (!responseUser) {
        throw new Error(
          "Updated user data not found in response"
        );
      }

      console.log(
        "UPDATED USER:",
        responseUser
      );

      // -----------------------------------------
      // 5. Merge with existing user
      // -----------------------------------------

      const updatedUser = {
        ...authUser,
        ...responseUser,
      };

      // -----------------------------------------
      // 6. Update localStorage
      // -----------------------------------------

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      // -----------------------------------------
      // 7. Update Zustand
      // -----------------------------------------

      useAuthStore.setState({
        user: updatedUser,
        token: token,
        refreshToken:
          localStorage.getItem("refreshToken") ||
          null,
        firebaseToken:
          localStorage.getItem("firebaseToken") ||
          null,
        isLoggedIn: true,
        loading: false,
        error: null,
      });

      // -----------------------------------------
      // 8. Notify other components
      // -----------------------------------------

      window.dispatchEvent(
        new Event("storage")
      );

      // -----------------------------------------
      // 9. Update local component state
      // -----------------------------------------

      setAuthUser(updatedUser);
      setPhotoChanged(false);
      setPhotoFile(null);

      // -----------------------------------------
      // 10. Success
      // -----------------------------------------

      setSaveState("saved");

      setTimeout(() => {
        router.back();
      }, 1000);
    } else {
      throw new Error(
        res?.data?.message ||
          "Update failed"
      );
    }
  } catch (err) {
    console.error(
      "Update profile error:",
      err?.response?.data ||
        err?.message ||
        err
    );

    alert(
      err?.response?.data?.message ||
        "Could not update your profile. Please try again."
    );

    setSaveState("idle");
  }
};

const panels = {
  Profile: authUser ? (
   <ProfilePanel
  user={{
    ...authUser,
    name: name,
    email: email,
    element: authUser.element || "Ether",
    level: authUser.level || "Practitioner",
    streakDays: authUser.streakDays || 0,
    sessionsCompleted: authUser.sessionsCompleted || 0,
    nextSession: authUser.nextSession || "No upcoming session",

    initials: name
      ? name
          .split(" ")
          .filter(Boolean)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U",
  }}
  avatarPreview={avatarPreview}
  setAvatarPreview={setAvatarPreview}
  setPhotoFile={setPhotoFile}
  setPhotoChanged={setPhotoChanged}
  name={name}
  setName={setName}
  bio={bio}
  setBio={setBio}
/>
  ) : null,

  Personal: (
    <PersonalPanel
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      dob={dob}
      setDob={setDob}
    />
  ),

  // Password: (
  //   <PasswordPanel
  //     current={current}
  //     setCurrent={setCurrent}
  //     next={next}
  //     setNext={setNext}
  //     confirm={confirm}
  //     setConfirm={setConfirm}
  //   />
  // ),
};
  const pageBg = dark ? "#111827" : "#f9fafb";
  const headerBg = dark ? "rgba(17,24,39,0.95)" : "rgba(255,255,255,0.95)";
  const border = dark ? "border-gray-700" : "border-gray-100";
  const cardBg = dark ? "bg-gray-800" : "bg-white";

  return (
    <div className="min-h-screen" style={{ backgroundColor: pageBg }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .panel-in { animation: fadeUp 0.22s cubic-bezier(.22,1,.36,1) both; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Sticky top bar ── */}
      <div className={`backdrop-blur-md border-b ${border} ${spacing.sectionPaddingX} py-3.5 flex items-center justify-between sticky top-0 z-30`} style={{ backgroundColor: headerBg }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${border}`} style={{ backgroundColor: dark ? "#1f2937" : "#fff", color: dark ? "#e5e7eb" : "#111827" }}>
            <Icon.back />
          </button>
          <div>
            <h1 className="text-sm font-bold leading-tight" style={{ color: dark ? "#f9fafb" : "#111827" }}>Edit Profile</h1>
            <p className="text-[10px]" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>my-madras account</p>
          </div>
        </div>

        <button onClick={handleSave} disabled={saveState === "saving"} className={`${btn.primary} min-w-[108px] flex items-center justify-center gap-1.5 text-xs`}>
          {saveState === "saving" && <><Icon.spin /> Saving…</>}
          {saveState === "saved" && <><Icon.check /> Saved!</>}
          {saveState === "idle" && "Save changes"}
        </button>
      </div>

      {/* ── Body ── */}
      <div className={`${spacing.sectionPaddingX} py-5`}>
        <div className="max-w-xl mx-auto space-y-3">

          {/* ── Tab bar ── */}
          <div className={`flex rounded-2xl p-1 border shadow-sm gap-1 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-1 whitespace-nowrap ${activeTab === tab ? "text-white shadow-sm" : dark ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-primary hover:bg-primary/5"}`}
                style={activeTab === tab ? { backgroundColor: textColor } : {}}
              >
                <span className="opacity-80">{TAB_ICONS[tab]}</span>
                <span>{tab}</span>
              </button>
            ))}
          </div>

          {/* ── Panel ── */}
          <div key={activeTab} className={`panel-in rounded-2xl border shadow-sm p-5 sm:p-6 ${cardBg} ${border}`} style={{ color: dark ? "#e5e7eb" : "#111827" }}>
            {panels[activeTab]}
          </div>

          {/* ── Mobile save ── */}
          <div className="flex gap-2.5 sm:hidden pb-6">
            <button onClick={() => router.back()} className={`flex-1 py-3 rounded-xl border text-sm font-semibold ${dark ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-200 bg-white text-gray-600"}`}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saveState === "saving"} className={`${btn.primary} flex-1 text-sm flex items-center justify-center gap-1.5`}>
              {saveState === "saved" ? <><Icon.check /> Saved!</> : saveState === "saving" ? <><Icon.spin /> Saving…</> : "Save changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <ThemeProvider>
      <EditProfileContent />
    </ThemeProvider>
  );
}