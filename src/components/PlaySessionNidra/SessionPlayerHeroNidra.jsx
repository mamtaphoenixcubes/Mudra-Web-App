"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Gauge,
  Timer,
  Download,
  Share2,
  ListMusic,
  ChevronDown,
  Clock,
  Headphones,
  BarChart2,
  Check,
  X,
  Loader2,
  PlusCircle,
  Search,
  Plus,
  Trash2,
  FolderHeart,
} from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";
import { yogaNidraService, playlistService } from "../../services/apiService";
import AddToPlaylistModal from "../AddToPlaylistModal";

const getImgBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `http://${hostname}:1337`;
    }
  }
  return "http://192.168.1.14:1337";
};

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || getImgBaseUrl();

// ─── Config ─────────────────────────────────────────────────────────────────
const SESSION = {
  title: "Deep Sleep Yoga Nidra",
  tagline: "Rest deeply. Restore naturally.",
  duration: "30 min",
  mode: "Audio",
  level: "Beginner",
  cover: IMAGES.YogaNidraHero,
  audioUrl: "/audio/deep-sleep-nidra.mp3",
  totalSeconds: 30 * 60,
  about:
    "This Yoga Nidra is designed to help you relax your body and mind, release tension and cultivate deep restorative sleep.",
};

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];
const SLEEP_TIMER_OPTIONS = [
  { label: "Off", value: null },
  { label: "5 min", value: 5 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
];

const PLAYLIST = [
  { id: 1, title: "Deep Sleep Yoga Nidra", duration: "30 min", active: true },
  { id: 2, title: "Morning Pranayama Flow", duration: "15 min" },
  { id: 3, title: "Root Chakra Grounding", duration: "20 min" },
  { id: 4, title: "Evening Body Scan", duration: "25 min" },
];

function formatTime(sec) {
  if (isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ─── Action Button ──────────────────────────────────────────────────────────
function ActionButton({ icon, label, sublabel, onClick }) {
  const { dark, textColor } = useTheme();

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 flex-1 min-w-0 w-full"
    >
      <span
        className="w-9 h-9 md:w-[38px] md:h-[38px] lg:w-11 lg:h-11 rounded-full flex items-center justify-center shadow-sm"
        style={{
          backgroundColor: dark ? "#374151" : "#ffffff",
          color: dark ? "#e5e7eb" : "#9A85FE",
        }}
      >
        {icon}
      </span>
      <span
        className="text-[9px] md:text-[10px] lg:text-[12px] font-medium leading-none truncate text-center whitespace-nowrap"
        style={{ color: dark ? "#e5e7eb" : "#3A362E" }}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className="text-[8px] md:text-[9px] lg:text-[11px] leading-none text-center whitespace-nowrap"
          style={{ color: dark ? "#9ca3af" : "#8A8577" }}
        >
          {sublabel}
        </span>
      )}
    </button>
  );
}

// ─── Popover Menu (Speed / Sleep Timer) ────────────────────────────────────
function PopoverMenu({ title, options, selectedValue, onSelect, onClose, dark }) {
  return (
    <div
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 rounded-2xl shadow-xl border overflow-hidden z-50"
      style={{
        backgroundColor: dark ? "#1f2937" : "#ffffff",
        borderColor: dark ? "#374151" : "#E9E3D6",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: dark ? "#374151" : "#E9E3D6" }}
      >
        <span
          className="text-[12px] font-semibold"
          style={{ color: dark ? "#e5e7eb" : "#3A362E" }}
        >
          {title}
        </span>
        <button onClick={onClose} aria-label="Close">
          <X size={14} style={{ color: dark ? "#9ca3af" : "#B7B0A0" }} />
        </button>
      </div>
      <div className="py-1 max-h-64 overflow-y-auto">
        {options.map((opt) => {
          const isSelected = opt.value === selectedValue;
          return (
            <button
              key={opt.label}
              onClick={() => onSelect(opt.value)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] hover:bg-black/5 transition-colors"
              style={{ color: dark ? "#e5e7eb" : "#3A362E" }}
            >
              <span>{opt.label}</span>
              {isSelected && <Check size={14} style={{ color: "#9A85FE" }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlaylistPanel({ tracks, onSelect, onClose, onAddToPlaylist, dark, textColor }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        className="relative w-full md:w-[420px] max-h-[75vh] md:max-h-[560px] rounded-t-[28px] md:rounded-[28px] overflow-hidden flex flex-col"
        style={{ backgroundColor: dark ? "#1f2937" : "#FBF7EF" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: dark ? "#374151" : "#E9E3D6" }}
        >
          <h3 className="font-serif text-[16px] font-semibold" style={{ color: textColor }}>
            Playlist
          </h3>
          <div className="flex items-center gap-2">
            {onAddToPlaylist && (
              <button
                onClick={onAddToPlaylist}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold text-[#9A85FE] hover:bg-[#9A85FE]/10 transition-colors"
              >
                <Plus size={13} /> Add to playlist
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close playlist"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <X size={16} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-3 py-2">
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="w-full flex items-center gap-3 px-2 py-2.5 rounded-2xl hover:bg-black/5 transition-colors"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#9A85FE] flex items-center justify-center">
                <Headphones size={18} className="text-white/80" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p
                  className="text-[13.5px] font-medium truncate"
                  style={{ color: t.active ? "#9A85FE" : dark ? "#e5e7eb" : "#3A362E" }}
                >
                  {t.title}
                </p>
                <p className="text-[11.5px]" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                  {t.duration}
                </p>
              </div>
              {t.active && <Play size={14} fill="#9A85FE" className="text-[#9A85FE] flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function extractIsLiked(data, profileId) {
  if (!data) return false;

  // 1. Direct boolean flags on data root
  if (typeof data.isLiked === "boolean") return data.isLiked;
  if (typeof data.IsLiked === "boolean") return data.IsLiked;

  // 2. Direct userActivity object (e.g. Yoga Nidra or normalized response)
  const act = data.userActivity;
  if (act && typeof act === "object") {
    if (typeof act.isLiked === "boolean") return act.isLiked;
    if (typeof act.IsLiked === "boolean") return act.IsLiked;
  }

  // 3. Array of userMudraActivities (e.g. Mudras)
  if (Array.isArray(data.userMudraActivities) && data.userMudraActivities.length > 0) {
    let userAct = null;
    if (profileId) {
      userAct = data.userMudraActivities.find(
        (a) =>
          a?.user?.documentId === profileId ||
          a?.user?.id === profileId ||
          String(a?.user?.id) === String(profileId)
      );
    }
    if (!userAct) {
      userAct = data.userMudraActivities[0];
    }
    if (userAct) {
      if (typeof userAct.isLiked === "boolean") return userAct.isLiked;
      if (typeof userAct.IsLiked === "boolean") return userAct.IsLiked;
    }
  }

  return false;
}

// ─── Session Player ─────────────────────────────────────────────────────────
export default function SessionPlayer({
  sessionData = null,
  type = "yoganidra",
  mode = "guided",
  durationParam = null,
  playlistTracks: propPlaylistTracks = null,
  currentTrackIndex: controlledTrackIndex,
  setCurrentTrackIndex: setControlledTrackIndex,
  playing: controlledPlaying,
  setPlaying: setControlledPlaying,
  current: controlledCurrent,
  setCurrent: setControlledCurrent,
  totalSecs: controlledTotalSecs,
  setTotalSecs: setControlledTotalSecs,
}) {
  const { dark, textColor } = useTheme();
console.log(sessionData,"heroImgUrlheroImgUrl");
  
  const [localTrackIndex, setLocalTrackIndex] = useState(0);
  const currentTrackIndex = setControlledTrackIndex ? controlledTrackIndex : localTrackIndex;
  const setCurrentTrackIndex = setControlledTrackIndex || setLocalTrackIndex;

  const [localTotalSecs, setLocalTotalSecs] = useState(0);
  const totalSecs = setControlledTotalSecs ? controlledTotalSecs : localTotalSecs;
  const setTotalSecs = setControlledTotalSecs || setLocalTotalSecs;

  // Unwrap nested data if present (e.g. from Strapi/Express response wrapper)
  const actualData = sessionData?.data || sessionData;
  const isPlaylist = isMudra 
    ? (actualData?.mediaType === "AUDIO_PLAYLIST" || actualData?.mediaType === "VIDEO_PLAYLIST")
    : (actualData?.AudioPlaylist && actualData.AudioPlaylist.length > 0);

const playlistTracks =
  propPlaylistTracks ||
  (
    actualData?.AudioSingleSessions?.length > 0
      ? actualData.AudioSingleSessions
      : actualData?.AudioPlaylist?.[0]?.audios || []
  );
  const activeTrack = playlistTracks[currentTrackIndex];

  // Dynamic API mappings
  const heroName = activeTrack?.title || actualData?.title || actualData?.name || actualData?.Name || "";
  const categoryName =
  actualData?.NidraCategories?.[0]?.Name ||
  actualData?.NidraIntroCard?.Category?.Name ||
  "";
const shortDescription =
  actualData?.description ||
  actualData?.aboutSession ||
  actualData?.WebDetailsPage?.HeroSectionWeb?.HeroDescription ||
  "";
  const durationStr = totalSecs
    ? (totalSecs < 60 ? `${Math.round(totalSecs)} sec` : `${Math.floor(totalSecs / 60)} min`)
    : (actualData?.duration ? `${actualData.duration} min` : "");
  const levelStr = actualData?.level || actualData?.Level || "Beginner";
  
  const rawAudio = activeTrack?.audioFile?.url || activeTrack?.videoFile?.url || actualData?.audioFile?.url || actualData?.mediaLink || actualData?.media_link;
  const resolvedAudioUrl = rawAudio
    ? (rawAudio.startsWith("http") ? rawAudio : `${IMAGE_BASE_URL}${rawAudio}`)
    : null;
  
  const defaultTotalSecs = activeTrack?.durationInSeconds
    ? activeTrack.durationInSeconds
    : ((actualData?.duration || actualData?.Duration) ? (actualData.duration || actualData.Duration) * 60 : 0);

  useEffect(() => {
    if (setTotalSecs) {
      setTotalSecs(defaultTotalSecs);
    }
  }, [resolvedAudioUrl, defaultTotalSecs, setTotalSecs]);

  const thumbnail = actualData?.thumbnail?.url || actualData?.WebDetailsPage?.HeroSectionWeb?.HeroImages?.[0]?.url || actualData?.ThumbnailImage?.[0]?.url;
  const heroImgUrl = thumbnail ? (thumbnail.startsWith("http") ? thumbnail : `${IMAGE_BASE_URL}${thumbnail}`) : "";

  const tracksList = playlistTracks.length > 0
    ? playlistTracks.map((a, idx) => ({
        id: a.id,
        title: a.title,
        duration: a.durationInSeconds ? `${Math.floor(a.durationInSeconds / 60)} min` : "15 min",
        active: idx === currentTrackIndex
      }))
    : [];

  const [localPlaying, setLocalPlaying] = useState(false);
  const playing = setControlledPlaying ? controlledPlaying : localPlaying;
  const setPlaying = setControlledPlaying || setLocalPlaying;

  const [localCurrent, setLocalCurrent] = useState(0);
  const current = setControlledCurrent ? controlledCurrent : localCurrent;
  const setCurrent = setControlledCurrent || setLocalCurrent;
  const [liked, setLiked] = useState(false);

  const { user } = useAuthStore();
  const profileDocId = user?.profileDocumentId || user?.profileDocId || (typeof user?.id === "string" && user.id.length > 5 ? user.id : null) || "nh0p1vtynpr7mge2orest5mt";

  // Sync liked status dynamically whenever actualData or profileDocId updates
  useEffect(() => {
    if (actualData) {
      const initialLiked = extractIsLiked(actualData, profileDocId);
      setLiked(initialLiked);
    }
  }, [actualData, profileDocId]);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [sleepTimer, setSleepTimer] = useState(null);
  const [sleepRemaining, setSleepRemaining] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [addToPlaylistOpen, setAddToPlaylistOpen] = useState(false);

  const menuRef = useRef(null);
  const audioRef = useRef(null);
  const sleepIntervalRef = useRef(null);
  const lastProgressSentRef = useRef(0);

  // Countdown timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [timerTotalSeconds, setTimerTotalSeconds] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [playBellOnEnd, setPlayBellOnEnd] = useState(true);

  // Initialize countdown timer from params or localStorage
 // Initialize countdown timer from params or localStorage
useEffect(() => {
  if (!isMudra) return;

 const nidraDocId = actualData?.documentId || actualData?.id;

  if (!nidraDocId) return;

  const totalTimeFromProps = Number(durationParam);

  let restored = null;

  try {
    const key = `yoganidra_timer_${nidraDocId}`;
    const cached = localStorage.getItem(key);

    if (cached) {
      const parsed = JSON.parse(cached);

      console.log("Timer from props:", totalTimeFromProps);
      console.log("Timer from localStorage:", parsed);
      console.log("Stored totalSeconds:", parsed?.totalSeconds);

      // Restore ONLY when prop duration matches stored totalSeconds
      if (
        parsed?.active &&
        Number(parsed?.totalSeconds) === totalTimeFromProps
      ) {
        restored = parsed;
      } else {
        // Different timer duration, remove old timer
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.warn("Failed to restore timer state:", e);
  }

  if (restored) {
    console.log("Restoring existing timer");

    setTimerTotalSeconds(restored.totalSeconds);
    setTimerSecondsLeft(restored.secondsLeft);
    setTimerActive(true);
    setTimerPaused(restored.paused);
    setPlayBellOnEnd(restored.playBell);
    setPlaying(!restored.paused);
    setTimerModalOpen(true);
  } else if (mode === "timer" && totalTimeFromProps > 0) {
    console.log("Starting new timer:", totalTimeFromProps);

    setTimerTotalSeconds(totalTimeFromProps);
    setTimerSecondsLeft(totalTimeFromProps);
    setTimerActive(true);
    setTimerPaused(false);
    setPlaying(true);
    setTimerModalOpen(true);
  }
}, [durationParam, isMudra, mode, actualData]);

  // Save countdown timer state to localStorage
  useEffect(() => {
    const nidraDocId = actualData?.documentId || actualData?.id;
    if (nidraDocId && timerActive && timerSecondsLeft > 0) {
      localStorage.setItem(
        `yoganidra_timer_${nidraDocId}`,
        JSON.stringify({
          secondsLeft: timerSecondsLeft,
          totalSeconds: timerTotalSeconds,
          active: timerActive,
          paused: timerPaused,
          playBell: playBellOnEnd,
        })
      );
    } else if (nidraDocId && (!timerActive || timerSecondsLeft <= 0)) {
      localStorage.removeItem(`yoganidra_timer_${nidraDocId}`);
    }
  }, [timerSecondsLeft, timerTotalSeconds, timerActive, timerPaused, playBellOnEnd, actualData]);

  // Sync timer pause state with play/pause controller
  useEffect(() => {
    if (timerActive) {
      setTimerPaused(!playing);
    }
  }, [playing, timerActive]);

  // Synthesize Tibetan singing bowl bell using Web Audio API
  const playSingingBowlSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(220, ctx.currentTime);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(440, ctx.currentTime);
      
      gain1.gain.setValueAtTime(0.5, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0);
      
      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0);
      
      osc1.connect(gain1);
      osc2.connect(gain2);
      
      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 5.0);
      osc2.stop(ctx.currentTime + 5.0);
    } catch (e) {
      console.warn("Failed to synthesize bell sound:", e);
    }
  };


  const handleTimerComplete = async () => {
    setTimerActive(false);
    setPlaying(false);
    
    if (playBellOnEnd) {
      playSingingBowlSound();
    }

    const mudraDocId = actualData?.documentId || actualData?.id;
    if (mudraDocId) {
      try {
        await mudraService.completeMudra(mudraDocId, profileDocId, timerTotalSeconds);
      } catch (err) {
        console.warn("Failed to complete mudra session:", err);
      }
    }
    showToast("Meditation timer completed!");
  };

const handleTimerPauseToggle = () => {
  setPlaying((prev) => !prev);
};

  const handleTimerStop = async () => {
    setTimerActive(false);
    setPlaying(false);
    
    const elapsed = timerTotalSeconds - timerSecondsLeft;
    const mudraDocId = actualData?.documentId || actualData?.id;
    if (mudraDocId && elapsed > 0) {
      try {
        await mudraService.completeMudra(mudraDocId, profileDocId, elapsed);
      } catch (err) {
        console.warn("Failed to complete mudra session on stop:", err);
      }
    }
    setTimerModalOpen(false);
  };

  // Timer Tick Interval (pure state updater)
  useEffect(() => {
    let interval = null;
    if (timerActive && playing && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, playing, timerSecondsLeft]);

  // Separate Effect to handle timer completion and 10-second progress tracking safely outside render
useEffect(() => {
  if (!timerActive) return;

  if (timerSecondsLeft === 0) {
    handleTimerComplete();
  }
}, [timerActive, timerSecondsLeft]);

 const sendProgressUpdate = async (currentTime) => {
  const currentId =
    actualData?.documentId ||
    actualData?.id ||
    "ui2phqjaaqub5r1k38gkppko";

  try {
    const activeTrackId =
      activeTrack?.documentId ||
      activeTrack?.id ||
      currentId;

    const mediaTypeVal =
      actualData?.mediaType ||
      actualData?.MediaType ||
      "AUDIO_SINGLE";

    // For Mudra timer, use the actual timer values
    const sessionDuration = timerActive
      ? Math.floor(timerTotalSeconds)
      : Math.floor(totalSecs);

    const remainingDuration = timerActive
      ? Math.floor(timerSecondsLeft)
      : Math.max(0, Math.floor(totalSecs - currentTime));

    console.log("Saving progress:", {
      sessionDuration,
      remainingDuration,
      timerTotalSeconds,
      timerSecondsLeft,
      totalSecs,
      currentTime,
    });

    if (isMudra) {
      await mudraService.saveMudraMediaProgress({
        profileDocumentId: profileDocId,
        mediaType: mediaTypeVal,
        mediaDocumentId: activeTrackId,
        mudraDocumentId: currentId,
        remainingDuration,
        sessionDuration,
      });
    } else {
      await yogaNidraService.saveMediaProgress({
        profileDocumentId: profileDocId,
        mediaType: mediaTypeVal,
        mediaDocumentId: activeTrackId,
        nidraDocumentId: currentId,
        mudraDocumentId: currentId,
        remainingDuration,
        sessionDuration,
      });
    }

    lastProgressSentRef.current = currentTime;
  } catch (err) {
    console.warn("Failed to update media progress:", err);
  }
};

  // Sync audio source
  useEffect(() => {
    if (audioRef.current && resolvedAudioUrl) {
      audioRef.current.src = resolvedAudioUrl;
      audioRef.current.load();
      if (playing && (!timerActive || playBellOnEnd)) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [resolvedAudioUrl, playing, timerActive, playBellOnEnd]);

  // Sync audio playback
  useEffect(() => {
    if (!audioRef.current || !resolvedAudioUrl) return;
    if (playing && (!timerActive || playBellOnEnd)) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing, resolvedAudioUrl, timerActive, playBellOnEnd]);




  // Sync playback speed
  useEffect(() => {
    const activeEl = audioRef.current;
    if (activeEl) {
      activeEl.playbackRate = speed;
    }
  }, [speed]);

  // Sleep timer interval
  useEffect(() => {
    if (sleepRemaining === null) {
      clearInterval(sleepIntervalRef.current);
      return;
    }
    sleepIntervalRef.current = setInterval(() => {
      setSleepRemaining((r) => {
        if (r <= 1) {
          setPlaying(false);
          setSleepTimer(null);
          return null;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(sleepIntervalRef.current);
  }, [sleepRemaining]);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    if (openMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMenu]);

  const progress = totalSecs > 0 ? (current / totalSecs) * 100 : 0;

  function handleScrub(e) {
    const pct = Number(e.target.value);
    const newTime = (pct / 100) * totalSecs;
    setCurrent(newTime);
    const activeEl = isVideoMode ? videoRef.current : audioRef.current;
    if (activeEl) {
      activeEl.currentTime = newTime;
    }
  }
const handlePlayPause = () => {
  if (playing) {
    // User explicitly clicked Pause
    const activeEl = isVideoMode ? videoRef.current : audioRef.current;

    if (activeEl) {
      sendProgressUpdate(activeEl.currentTime);
    }
  }

  setPlaying((prev) => !prev);
};
 function handleTimeUpdate() {
  const activeEl = isVideoMode ? videoRef.current : audioRef.current;

  if (activeEl) {
    const curr = activeEl.currentTime;
    setCurrent(curr);
  }
}

  function handleLoadedMetadata(e) {
    if (e.target && e.target.duration && setTotalSecs) {
      setTotalSecs(e.target.duration);
    }
  }

  async function handleAudioEnded() {
    const activeEl = isVideoMode ? videoRef.current : audioRef.current;
    const duration = activeEl ? activeEl.duration : totalSecs;

    // Handle timer active loop behavior
    if (timerActive) {
      if (isVideoMode) {
        if (isPlaylist) {
          const nextIdx = (currentTrackIndex + 1) % playlistTracks.length;
          setCurrentTrackIndex(nextIdx);
          setCurrent(0);
          setPlaying(true);
        } else {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            if (!timerActive || playBellOnEnd) {
              videoRef.current.play().catch(() => {});
            }
          }
        }
      } else {
        if (isPlaylist) {
          const nextIdx = (currentTrackIndex + 1) % playlistTracks.length;
          setCurrentTrackIndex(nextIdx);
          setCurrent(0);
          setPlaying(true);
        } else {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            if (!timerActive || playBellOnEnd) {
              audioRef.current.play().catch(() => {});
            }
          }
        }
      }
      
      try {
        const activeTrackId = activeTrack?.documentId || activeTrack?.id || currentId;
        const mediaTypeVal = actualData?.mediaType || actualData?.MediaType || "AUDIO_SINGLE";
        const currentId = actualData?.documentId || actualData?.id;

        if (isMudra) {
          await mudraService.completeMudraMedia({
            profileDocumentId: profileDocId,
            mediaType: mediaTypeVal,
            mediaDocumentId: activeTrackId,
            mudraDocumentId: currentId,
            completedDuration: Math.round(duration || totalSecs || 0)
          });
        } else {
          await yogaNidraService.completeMedia({
            profileDocumentId: profileDocId,
            mediaType: mediaTypeVal,
            mediaDocumentId: activeTrackId,
            nidraDocumentId: currentId,
            mudraDocumentId: currentId,
            completedDuration: Math.round(duration || totalSecs || 0)
          });
        }
      } catch (e) {
        console.warn("Failed to complete media inside timer loop:", e);
      }
      return;
    }

    // Normal end behavior
    setPlaying(false);
    const currentId = actualData?.documentId || actualData?.id || "ui2phqjaaqub5r1k38gkppko";
    try {
      const activeTrackId = activeTrack?.documentId || activeTrack?.id || currentId;
      const mediaTypeVal = actualData?.mediaType || actualData?.MediaType || "AUDIO_SINGLE";

      if (isMudra) {
        await mudraService.completeMudraMedia({
          profileDocumentId: profileDocId,
          mediaType: mediaTypeVal,
          mediaDocumentId: activeTrackId,
          mudraDocumentId: currentId,
          completedDuration: Math.round(duration || totalSecs || 0)
        });
      } else {
        await yogaNidraService.completeMedia({
          profileDocumentId: profileDocId,
          mediaType: mediaTypeVal,
          mediaDocumentId: activeTrackId,
          nidraDocumentId: currentId,
          mudraDocumentId: currentId,
          completedDuration: Math.round(duration || totalSecs || 0)
        });
      }
    } catch (err) {
      console.warn("Failed to mark session as completed:", err);
    }
  }

  const handleLike = async () => {
    const prevState = liked;
    const nextState = !liked;
    try {
      setLiked(nextState);
      const currentId = actualData?.documentId || actualData?.id || "ui2phqjaaqub5r1k38gkppko";
      let res;
      if (isMudra) {
        res = await mudraService.likeMudra(currentId, profileDocId);
      } else {
        res = await yogaNidraService.likeYogaNidra(currentId, profileDocId);
      }
      const resData = res?.data || res;
      const serverIsLiked = resData?.isLiked ?? resData?.IsLiked ?? resData?.isliked;
      if (typeof serverIsLiked === "boolean") {
        setLiked(serverIsLiked);
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
      setLiked(prevState);
    }
  };

  function handleSelectSpeed(value) {
    setSpeed(value);
    setOpenMenu(null);
  }

  function handleSelectSleepTimer(value) {
    setSleepTimer(value);
    setSleepRemaining(value ? value * 60 : null);
    setOpenMenu(null);
  }

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    const currentId = actualData?.documentId || actualData?.id || "ui2phqjaaqub5r1k38gkppko";
    try {
      // Report download to backend
      try {
        if (isMudra) {
          await mudraService.incrementMudraDownload(currentId, profileDocId);
        } else {
          await yogaNidraService.downloadYogaNidra(currentId, profileDocId);
        }
      } catch (dErr) {
        console.warn("Failed to track download:", dErr);
      }

      const res = await fetch(resolvedAudioUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${heroName.replace(/\s+/g, "-").toLowerCase()}.${isVideoMode ? "mp4" : "mp3"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    const currentId = actualData?.documentId || actualData?.id || "ui2phqjaaqub5r1k38gkppko";
    try {
      if (isMudra) {
        await mudraService.incrementMudraShare(currentId, profileDocId);
      } else {
        await yogaNidraService.shareYogaNidra(currentId, profileDocId);
      }
    } catch (sErr) {
      console.warn("Failed to track share:", sErr);
    }

    const shareData = {
      title: heroName,
      text: isMudra ? `Practice "${heroName}" on Mudras — ${categoryName}` : `Listen to "${heroName}" on Mudras — ${categoryName}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast("Shared successfully!");
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        showToast("Link copied to clipboard!");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareData.url;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      showToast("Failed to copy link.");
    }
  }

  const handlePrev = () => {
    if (playlistTracks.length > 1) {
      const prevIdx = (currentTrackIndex - 1 + playlistTracks.length) % playlistTracks.length;
      setCurrentTrackIndex(prevIdx);
      setCurrent(0);
      setPlaying(true);
    }
  };

  const handleNext = () => {
    if (playlistTracks.length > 1) {
      const nextIdx = (currentTrackIndex + 1) % playlistTracks.length;
      setCurrentTrackIndex(nextIdx);
      setCurrent(0);
      setPlaying(true);
    }
  };

  function handleSelectTrack(track) {
    if (playlistTracks.length > 0) {
      const idx = playlistTracks.findIndex((t) => t.id === track.id);
      if (idx !== -1) {
        setCurrentTrackIndex(idx);
        setCurrent(0);
        setPlaying(true);
      }
    }
    setPlaylistOpen(false);
  }

  const getActiveAudioId = () => {
    if (activeTrack?.documentId) return activeTrack.documentId;
    if (activeTrack?.id) return activeTrack.id;

    if (actualData?.audioSingleSessions?.[0]?.documentId) return actualData.audioSingleSessions[0].documentId;
    if (actualData?.audioSingleSessions?.[0]?.id) return actualData.audioSingleSessions[0].id;

    if (actualData?.audio_playlists?.[0]?.audios?.[0]?.documentId) return actualData.audio_playlists[0].audios[0].documentId;
    if (actualData?.audio_playlists?.[0]?.audios?.[0]?.id) return actualData.audio_playlists[0].audios[0].id;

    return actualData?.documentId || actualData?.id;
  };

  const getActiveVideoId = () => {
    if (activeTrack?.documentId) return activeTrack.documentId;
    if (activeTrack?.id) return activeTrack.id;

    if (actualData?.videoSingleSessions?.[0]?.documentId) return actualData.videoSingleSessions[0].documentId;
    if (actualData?.videoSingleSessions?.[0]?.id) return actualData.videoSingleSessions[0].id;

    if (actualData?.video_playlists?.[0]?.videos?.[0]?.documentId) return actualData.video_playlists[0].videos[0].documentId;
    if (actualData?.video_playlists?.[0]?.videos?.[0]?.id) return actualData.video_playlists[0].videos[0].id;

    return actualData?.documentId || actualData?.id;
  };

  const sleepSublabel =
    sleepRemaining !== null
      ? `${Math.floor(sleepRemaining / 60)}:${(sleepRemaining % 60).toString().padStart(2, "0")}`
      : "Off";

  return (
    <div
      className={`w-full pb-6`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
    >
      {!isVideoMode && resolvedAudioUrl && (
        <audio
          ref={audioRef}
          src={resolvedAudioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
      )}

      {/* Header */}
      <div className={`text-center pt-6 pb-4 lg:pt-10 lg:pb-8 ${spacing.sectionPaddingX}`}>
        <h1
          className={`${typography.playerTitle}`}
          style={{ color: textColor }}
        >
          Session Player
        </h1>
      </div>

      <div className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}>
        <div className="max-w-md mx-auto md:max-w-full md:mx-0 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20 max-w-7xl 2xl:max-w-[1400px] md:items-stretch">
          {/* ── Left column: Cover ── */}
          <div className="flex flex-col">
            <div
              className="relative rounded-[24px] overflow-hidden w-full max-h-[450px] md:max-h-[850px] flex-1"
              style={{
                backgroundColor: dark ? "#374151" : "#9A85FE",
              }}
            >
              {isVideoMode ? (
                <video
                  ref={videoRef}
                  src={resolvedAudioUrl || undefined}
                  controls
                  className="w-full h-full object-contain bg-black"
                  poster={heroImgUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleAudioEnded}
                />
              ) : heroImgUrl && !imageError ? (
                <img
                  src={heroImgUrl.src || heroImgUrl}
                  alt={heroName}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60">
                  <div className="text-center">
                    <Play size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No Image Available</p>
                  </div>
                </div>
              )}
              {!isVideoMode && (
              <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  <span className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-transform">
                    {playing ? (
                      <Pause size={26} className="text-white lg:w-8 lg:h-8" fill="white" />
                    ) : (
                      <Play size={26} className="text-white ml-1 lg:w-8 lg:h-8" fill="white" />
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* ── Right column: Details / controls / about ── */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6 mt-5 md:mt-0 flex flex-col">
            {/* Title row */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2
                  className={`${typography.playerHeading}`}
                  style={{ color: textColor }}
                >
                  {heroName}
                </h2>
                <p
                  className={`${typography.playerSubheading}`}
                  style={{ color: dark ? "#9ca3af" : "#8A8577" }}
                >
                  {categoryName}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-1 ml-4 flex-shrink-0">
                <button
                  onClick={handleLike}
                  aria-label="Like"
                  className="hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart
                    size={22}
                    className={liked ? "text-[#C4744E]" : "text-[#B7B0A0]"}
                    fill={liked ? "#C4744E" : "none"}
                  />
                </button>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 text-[11px] md:text-[12px] lg:text-[14px]">
              <span
                className="flex items-center gap-1.5"
                style={{ color: dark ? "#9ca3af" : "#8A8577" }}
              >
                <Clock size={14} /> {durationStr}
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: dark ? "#9ca3af" : "#8A8577" }}
              >
                <Headphones size={14} /> Audio
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: dark ? "#9ca3af" : "#8A8577" }}
              >
                <BarChart2 size={14} /> {levelStr}
              </span>
            </div>

            {/* Scrubber */}
            <div>
              <div className="relative h-1.5 flex items-center">
                <div
                  className="absolute inset-0 h-1.5 rounded-full"
                  style={{ backgroundColor: dark ? "#374151" : "#E9E3D6" }}
                />
                <div
                  className="absolute h-1.5 rounded-full"
                  style={{
                    backgroundColor: "#9A85FE",
                    width: `${progress}%`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress || 0}
                  onChange={handleScrub}
                  className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
                  aria-label="Seek"
                />
                <div
                  className="absolute w-3.5 h-3.5 rounded-full shadow-md pointer-events-none"
                  style={{
                    backgroundColor: "#9A85FE",
                    left: `calc(${progress}% - 7px)`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] md:text-[11px] lg:text-[12px]">
                <span style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                  {formatTime(current)}
                </span>
                <span style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                  {formatTime(totalSecs)}
                </span>
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex items-center justify-center px-2 md:px-0 lg:justify-center gap-3 md:gap-5 lg:gap-9">
              <button
                onClick={() => setShuffle((s) => !s)}
                aria-label="Shuffle"
                style={{ color: shuffle ? "#9A85FE" : dark ? "#6b7280" : "#B7B0A0" }}
                className="hover:scale-110 transition-transform"
              >
                <Shuffle size={20} />
              </button>
              <button
                onClick={handlePrev}
                aria-label="Previous"
                style={{ color: textColor }}
                className="hover:scale-110 transition-transform"
              >
                <SkipBack size={24} fill="currentColor" />
              </button>
             <button
              onClick={handlePlayPause}
              aria-label={playing ? "Pause" : "Play"}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
              style={{ backgroundColor: "#9A85FE" }}
            >
                {playing ? (
                  <Pause size={20} className="md:w-[22px] md:h-[22px] lg:w-[22px] lg:h-[22px]" fill="white" />
                ) : (
                  <Play size={20} className="md:w-[22px] md:h-[22px] lg:w-[22px] lg:h-[22px] ml-0.5" fill="white" />
                )}
              </button>
              <button
                onClick={handleNext}
                aria-label="Next"
                style={{ color: textColor }}
                className="hover:scale-110 transition-transform"
              >
                <SkipForward size={24} fill="currentColor" />
              </button>
              <button
                onClick={() => setRepeat((r) => !r)}
                aria-label="Repeat"
                style={{ color: repeat ? "#9A85FE" : dark ? "#6b7280" : "#B7B0A0" }}
                className="hover:scale-110 transition-transform"
              >
                <Repeat size={20} />
              </button>
            </div>

            {/* Action grid */}
            <div
              ref={menuRef}
              className="relative rounded-[20px] px-2 md:px-3 lg:px-4 py-4 md:py-5 flex items-center justify-center bg-balanced-card"
            >
              {/* Speed */}
              <div className="relative flex-1 min-w-0 flex flex-col items-center">
                <ActionButton
                  icon={<Gauge className="w-4 h-4 md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px]" />}
                  label="Speed"
                  sublabel={`${speed}x`}
                  onClick={() => setOpenMenu(openMenu === "speed" ? null : "speed")}
                />
                {openMenu === "speed" && (
                  <PopoverMenu
                    title="Playback Speed"
                    options={SPEED_OPTIONS.map((v) => ({ label: `${v}x`, value: v }))}
                    selectedValue={speed}
                    onSelect={handleSelectSpeed}
                    onClose={() => setOpenMenu(null)}
                    dark={dark}
                  />
                )}
              </div>

              {/* Divider */}
              <div
                className="w-px h-9 md:h-10 flex-shrink-0"
                style={{ backgroundColor: dark ? "#374151" : "#C9DCE3" }}
              />

              {/* Sleep Timer */}
              <div className="relative flex-1 min-w-0 flex flex-col items-center">
                <ActionButton
                  icon={<Timer className="w-4 h-4 md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px]" />}
                  label="Sleep Timer"
                  sublabel={sleepSublabel}
                  onClick={() => setOpenMenu(openMenu === "sleepTimer" ? null : "sleepTimer")}
                />
                {openMenu === "sleepTimer" && (
                  <PopoverMenu
                    title="Sleep Timer"
                    options={SLEEP_TIMER_OPTIONS}
                    selectedValue={sleepTimer}
                    onSelect={handleSelectSleepTimer}
                    onClose={() => setOpenMenu(null)}
                    dark={dark}
                  />
                )}
              </div>

              {/* Divider */}
              <div
                className="w-px h-9 md:h-10 flex-shrink-0"
                style={{ backgroundColor: dark ? "#374151" : "#C9DCE3" }}
              />

              {/* Download */}
              <div className="flex-1 min-w-0 flex flex-col items-center">
                <ActionButton
                  icon={
                    downloading ? (
                      <Loader2 className="w-4 h-4 md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px] animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px]" />
                    )
                  }
                  label="Download"
                  onClick={handleDownload}
                />
              </div>

              {/* Divider */}
              <div
                className="w-px h-9 md:h-10 flex-shrink-0"
                style={{ backgroundColor: dark ? "#374151" : "#C9DCE3" }}
              />

              {/* Share */}
              <div className="flex-1 min-w-0 flex flex-col items-center">
                <ActionButton
                  icon={<Share2 className="w-4 h-4 md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px]" />}
                  label="Share"
                  onClick={handleShare}
                />
              </div>

              {/* Divider */}
              <div
                className="w-px h-9 md:h-10 flex-shrink-0"
                style={{ backgroundColor: dark ? "#374151" : "#C9DCE3" }}
              />

              {/* Playlist */}
              <div className="flex-1 min-w-0 flex flex-col items-center">
                <ActionButton
                  icon={<ListMusic className="w-4 h-4 md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px]" />}
                  label="Playlist"
                  onClick={() => setAddToPlaylistOpen(true)}
                />
              </div>
            </div>

            {/* About this session */}
            <div
              className="rounded-[20px] border px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-6 pb-4 md:pb-6"
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                borderColor: dark ? "#374151" : "#E9E3D6",
              }}
            >
              <button
                onClick={() => setAboutOpen((o) => !o)}
                className="w-full flex items-center justify-between"
              >
                <h3
                  className={`${typography.playerAboutTitle}`}
                  style={{ color: textColor }}
                >
                  About this session
                </h3>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                  style={{ color: dark ? "#9ca3af" : "#B7B0A0" }}
                />
              </button>
              <p
                className={`${typography.playerAboutBody} mt-2 transition-all ${aboutOpen ? "" : "line-clamp-2"}`}
                style={{ color: dark ? "#d1d5db" : "#8A8577" }}
              >
                {shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {playlistOpen && (
        <PlaylistPanel
          tracks={tracksList}
          onSelect={handleSelectTrack}
          onClose={() => setPlaylistOpen(false)}
          onAddToPlaylist={() => {
            setPlaylistOpen(false);
            setAddToPlaylistOpen(true);
          }}
          dark={dark}
          textColor={textColor}
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-black/85 backdrop-blur-md text-white text-[13px] md:text-[14px] px-6 py-3 rounded-full border border-white/10 shadow-lg transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

      {/* Floating clock timer button if it is a Mudra */}
      {
        <button
          onClick={() => setTimerModalOpen(true)}
          className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#9A85FE] text-white shadow-xl hover:scale-105 active:scale-95 transition-transform border border-white/20"
        >
          <Clock size={20} />
          {timerActive && (
            <span className="text-sm font-semibold tracking-wide">
              {Math.floor(timerSecondsLeft / 60).toString().padStart(2, "0")}:
              {(timerSecondsLeft % 60).toString().padStart(2, "0")}
            </span>
          )}
        </button>
      }

   

      {addToPlaylistOpen && (
        <AddToPlaylistModal
          dark={dark}
          textColor={textColor}
          audioId={isVideoMode ? getActiveVideoId() : getActiveAudioId()}
          profileDocId={profileDocId}
          isMudra={isMudra}
          isVideo={isVideoMode}
          onClose={() => setAddToPlaylistOpen(false)}
        />
      )}
    </div>
  );
}
