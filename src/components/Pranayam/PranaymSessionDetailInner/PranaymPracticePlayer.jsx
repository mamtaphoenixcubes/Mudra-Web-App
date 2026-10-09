"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Music,
  Video,
  Clock,
  ListMusic,
  Volume1,
  Tv,
} from "lucide-react";
import { spacing, typography } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";
import { useAuthStore } from "../../../store/useAuthStore";
import { yogaNidraService } from "../../../services/apiService";

export default function PranaymPracticePlayer({
  // Accept either an asana or mudra object
  asana = null,
  mudra = null,
}) {
  const { dark, textColor } = useTheme();
  const { user } = useAuthStore();
  const sectionRef = useRef(null);

  // Dynamic Image / Media Server URL resolver
  const getImgBaseUrl = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
        return `http://${hostname}:1337`;
      }
    }
    return "http://192.168.1.14:1337";
  };
  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || getImgBaseUrl();

  // Prefer asana, fall back to mudra; unwrap nested { data: ... }
  const rawData = asana || mudra || null;
  const data = rawData?.data || rawData;

  // Extract media properties from API payload
  const mediaType = data?.mediaType || "TIMER";
  const durationCard = data?.durationPickerCard || {
    defaultDuration: 5,
    beginnerDuration: 5,
    intermediateDuration: 10,
    expertDuration: 15,
    advancedDuration: 20,
  };

  const sessionName =
    data?.name || data?.title || data?.Name || "Session";

  // ─── AUDIO SINGLE / PLAYLIST STATES ───
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // ─── VIDEO SINGLE / PLAYLIST STATES ───
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // ─── TIMER STATES ───
  const [timerDuration, setTimerDuration] = useState(
    durationCard.defaultDuration * 60
  ); // seconds
  const [timerRemaining, setTimerRemaining] = useState(
    durationCard.defaultDuration * 60
  );
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeDurationLevel, setActiveDurationLevel] = useState("default");
  const timerIntervalRef = useRef(null);

  // ─── EXTRACT PLAYLIST ARRAYS ───
  const audioTracks =
    data?.audioSingleSessions?.length > 0
      ? data.audioSingleSessions
      : data?.audio_playlists?.[0]?.audios || [];

  const videoTracks =
    data?.videoSingleSessions?.length > 0
      ? data.videoSingleSessions
      : data?.video_playlists?.[0]?.videos || [];

  const isPlaylist =
    mediaType === "AUDIO_PLAYLIST" || mediaType === "VIDEO_PLAYLIST";

  // Tibetan Singing Bowl synthesis (Web Audio API)
  const playZenBell = () => {
    if (typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext ||
        window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const fundamental = 144;
      const harmonics = [1, 2, 2.76, 3.2, 4.54, 5.4];
      const amplitudes = [0.5, 0.25, 0.15, 0.1, 0.05, 0.02];

      harmonics.forEach((harmonic, index) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(fundamental * harmonic, now);

        if (index > 0) {
          osc.detune.setValueAtTime(
            (Math.random() - 0.5) * 15,
            now
          );
        }

        gainNode.gain.setValueAtTime(amplitudes[index], now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 5);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 5);
      });
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  };

  // Reset on session or mediaType change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentTrackIndex(0);
    setCurrentVideoIndex(0);
    setTimerRunning(false);
    setTimerDuration(durationCard.defaultDuration * 60);
    setTimerRemaining(durationCard.defaultDuration * 60);
    setActiveDurationLevel("default");
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, [data?.id, data?.documentId, mediaType]);

  // Audio effect triggers
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  // Video effect triggers
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideoIndex]);

  // Timer countdown engine
  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            clearInterval(timerIntervalRef.current);
            playZenBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning]);

  const lastTrackedTimeRef = useRef(0);
  const completionTrackedRef = useRef({});

  const profileDocId =
    user?.profileDocumentId ||
    user?.profileDocId ||
    (typeof user?.id === "string" && user.id.length > 5 ? user.id : null) ||
    "nh0p1vtynpr7mge2orest5mt";

  const trackMediaProgress = async (currentPlayTime, totalDuration) => {
    if (!totalDuration || totalDuration <= 0) return;
    if (Math.abs(currentPlayTime - lastTrackedTimeRef.current) >= 10) {
      lastTrackedTimeRef.current = currentPlayTime;
      const activeTrack = mediaType.startsWith("AUDIO")
        ? audioTracks[currentTrackIndex]
        : videoTracks[currentVideoIndex];
      const mediaDocId =
        activeTrack?.documentId || activeTrack?.id || "unknown_media";

      try {
        await yogaNidraService.saveMediaProgress({
          profileDocumentId: profileDocId,
          mediaType: mediaType,
          mediaDocumentId: mediaDocId,
          remainingDuration: Math.max(
            0,
            Math.round(totalDuration - currentPlayTime)
          ),
          sessionDuration: Math.round(totalDuration),
        });
      } catch (err) {
        console.warn("Failed to track media progress:", err);
      }
    }
  };

  const trackMediaComplete = async (totalDuration) => {
    const activeTrack = mediaType.startsWith("AUDIO")
      ? audioTracks[currentTrackIndex]
      : videoTracks[currentVideoIndex];
    const mediaDocId =
      activeTrack?.documentId || activeTrack?.id || "unknown_media";
    if (completionTrackedRef.current[mediaDocId]) return;
    completionTrackedRef.current[mediaDocId] = true;

    const sessionDocId = data?.documentId || data?.id;

    try {
      await yogaNidraService.completeMedia({
        profileDocumentId: profileDocId,
        mediaType: mediaType,
        mediaDocumentId: mediaDocId,
        mudraDocumentId: sessionDocId, // kept for API compatibility
        completedDuration: Math.round(totalDuration || 0),
      });
    } catch (err) {
      console.warn("Failed to track media completion:", err);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);
      trackMediaProgress(current, audioRef.current.duration);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    if (audioRef.current) {
      trackMediaComplete(audioRef.current.duration);
    }
    if (
      mediaType === "AUDIO_PLAYLIST" &&
      currentTrackIndex < audioTracks.length - 1
    ) {
      setCurrentTrackIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      trackMediaProgress(
        videoRef.current.currentTime,
        videoRef.current.duration
      );
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      trackMediaComplete(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTimeStr = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelectDurationLevel = (level, mins) => {
    setActiveDurationLevel(level);
    setTimerDuration(mins * 60);
    setTimerRemaining(mins * 60);
    setTimerRunning(false);
  };

  const getMediaSourceUrl = (fileObj) => {
    if (!fileObj || !fileObj.url) return "";
    if (fileObj.url.startsWith("http")) return fileObj.url;
    return `${IMAGE_BASE_URL}${fileObj.url}`;
  };

  // Circular progress for the timer
  const timerPercentage =
    timerDuration > 0
      ? ((timerDuration - timerRemaining) / timerDuration) * 100
      : 0;
  const strokeRadius = 70;
  const strokeCircumference = 2 * Math.PI * strokeRadius;
  const strokeOffset =
    strokeCircumference -
    (strokeCircumference * timerPercentage) / 100;

  return (
    <section
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY} flex justify-center`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div className="w-full max-w-5xl">
        <div
          className="rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border relative transition-all duration-300 overflow-hidden"
          style={{
            backgroundColor: dark ? "#1f2937" : "#f9fafb",
            borderColor: dark ? "#374151" : "#e5e7eb",
          }}
        >
          {/* Header */}
          <div
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6"
            style={{ borderColor: dark ? "#374151" : "#e5e7eb" }}
          >
            <div>
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: textColor }}
              >
                {mediaType === "TIMER" ? "Self-Guided" : "Guided Session"}
              </span>
              <h2
                className="text-2xl font-bold mt-1"
                style={{ color: dark ? "#ffffff" : "#1f2937" }}
              >
                Practice {sessionName}
              </h2>
            </div>

            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: dark ? "#9ca3af" : "#6b7280" }}
            >
              {mediaType.includes("AUDIO") ? (
                <>
                  <Music className="w-4 h-4" />
                  <span>
                    Audio Meditation ({isPlaylist ? "Playlist" : "Single"})
                  </span>
                </>
              ) : mediaType.includes("VIDEO") ? (
                <>
                  <Video className="w-4 h-4" />
                  <span>
                    Video Session ({isPlaylist ? "Playlist" : "Single"})
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Interactive Meditation Timer</span>
                </>
              )}
            </div>
          </div>

          {/* ── TYPE 1: AUDIO_SINGLE / AUDIO_PLAYLIST ── */}
          {mediaType.startsWith("AUDIO") && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div
                className={`${
                  isPlaylist ? "lg:col-span-7" : "lg:col-span-12"
                } flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl p-6 border`}
                style={{ borderColor: dark ? "#374151" : "#e5e7eb" }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-36 h-36 rounded-2xl relative shadow-md overflow-hidden bg-primary/10 flex items-center justify-center mb-6">
                    {audioTracks[currentTrackIndex]?.thumbnail?.url ? (
                      <img
                        src={getMediaSourceUrl(
                          audioTracks[currentTrackIndex].thumbnail
                        )}
                        alt="Session cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music
                        className="w-12 h-12"
                        style={{ color: textColor }}
                      />
                    )}
                  </div>

                  <h3
                    className="font-semibold text-lg"
                    style={{ color: dark ? "#ffffff" : "#1f2937" }}
                  >
                    {audioTracks[currentTrackIndex]?.title ||
                      sessionName ||
                      "Guided Audio"}
                  </h3>

                  <p
                    className="text-xs mt-1 mb-4"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    {audioTracks[currentTrackIndex]?.description?.[0]
                      ?.children?.[0]?.text || "Relax and let go."}
                  </p>
                </div>

                {audioTracks[currentTrackIndex] && (
                  <audio
                    ref={audioRef}
                    src={getMediaSourceUrl(
                      audioTracks[currentTrackIndex]?.audioFile
                    )}
                    onTimeUpdate={handleAudioTimeUpdate}
                    onLoadedMetadata={handleAudioLoadedMetadata}
                    onEnded={handleAudioEnded}
                  />
                )}

                <div className="w-full mt-4">
                  <div
                    className="flex items-center justify-between text-xs mb-1"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    <span>{formatTimeStr(currentTime)}</span>
                    <span>{formatTimeStr(duration)}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 appearance-none cursor-pointer accent-primary"
                    style={{ accentColor: "#9A85FE" }}
                  />

                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      style={{ color: dark ? "#ffffff" : "#4b5563" }}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: textColor, color: "#ffffff" }}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentTime(0);
                        if (audioRef.current) audioRef.current.currentTime = 0;
                      }}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      style={{ color: dark ? "#ffffff" : "#4b5563" }}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {isPlaylist && (
                <div
                  className="lg:col-span-5 flex flex-col bg-white dark:bg-gray-800 rounded-xl p-5 border"
                  style={{ borderColor: dark ? "#374151" : "#e5e7eb" }}
                >
                  <h3
                    className="font-semibold text-sm mb-4 flex items-center gap-2"
                    style={{ color: dark ? "#ffffff" : "#1f2937" }}
                  >
                    <ListMusic className="w-4 h-4" />
                    <span>Up Next</span>
                  </h3>

                  <div className="flex-1 overflow-y-auto space-y-2 max-h-[290px] pr-2 scrollbar-thin">
                    {audioTracks.map((track, i) => (
                      <button
                        key={track.id || i}
                        onClick={() => {
                          setCurrentTrackIndex(i);
                          setIsPlaying(true);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition ${
                          currentTrackIndex === i
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border-gray-100 dark:border-gray-700"
                        }`}
                      >
                        <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden shrink-0">
                          {track.thumbnail?.url ? (
                            <img
                              src={getMediaSourceUrl(track.thumbnail)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Music
                              className="w-4 h-4"
                              style={{ color: textColor }}
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-medium text-xs truncate"
                            style={{ color: dark ? "#ffffff" : "#1f2937" }}
                          >
                            {track.title}
                          </h4>
                          <p
                            className="text-[10px] truncate"
                            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                          >
                            Track {i + 1}
                          </p>
                        </div>

                        {currentTrackIndex === i && isPlaying && (
                          <div className="flex gap-0.5 items-end h-3">
                            <span className="w-0.5 h-2 bg-primary animate-[bounce_0.8s_infinite]" />
                            <span className="w-0.5 h-3 bg-primary animate-[bounce_0.8s_infinite_0.2s]" />
                            <span className="w-0.5 h-1 bg-primary animate-[bounce_0.8s_infinite_0.4s]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TYPE 2: VIDEO_SINGLE / VIDEO_PLAYLIST ── */}
          {mediaType.startsWith("VIDEO") && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div
                className={`${
                  isPlaylist ? "lg:col-span-8" : "lg:col-span-12"
                } flex flex-col justify-between`}
              >
                <div
                  className="w-full aspect-video rounded-xl overflow-hidden relative border shadow bg-black flex items-center justify-center"
                  style={{ borderColor: dark ? "#374151" : "#e5e7eb" }}
                >
                  {videoTracks[currentVideoIndex] ? (
                    <video
                      ref={videoRef}
                      src={getMediaSourceUrl(
                        videoTracks[currentVideoIndex]?.videoFile
                      )}
                      controls
                      className="w-full h-full"
                      poster={getMediaSourceUrl(
                        videoTracks[currentVideoIndex]?.thumbnail
                      )}
                      onTimeUpdate={handleVideoTimeUpdate}
                      onEnded={handleVideoEnded}
                    />
                  ) : (
                    <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
                      <Tv className="w-12 h-12" />
                      <span>No Video Media Available</span>
                    </div>
                  )}
                </div>

                {videoTracks[currentVideoIndex] && (
                  <div className="mt-4">
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: dark ? "#ffffff" : "#1f2937" }}
                    >
                      {videoTracks[currentVideoIndex]?.title || sessionName}
                    </h3>
                    <p
                      className="text-xs mt-1"
                      style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    >
                      {videoTracks[currentVideoIndex]?.description?.[0]
                        ?.children?.[0]?.text ||
                        "Watch the instructions carefully."}
                    </p>
                  </div>
                )}
              </div>

              {isPlaylist && (
                <div
                  className="lg:col-span-4 flex flex-col bg-white dark:bg-gray-800 rounded-xl p-5 border"
                  style={{ borderColor: dark ? "#374151" : "#e5e7eb" }}
                >
                  <h3
                    className="font-semibold text-sm mb-4 flex items-center gap-2"
                    style={{ color: dark ? "#ffffff" : "#1f2937" }}
                  >
                    <ListMusic className="w-4 h-4" />
                    <span>Videos</span>
                  </h3>

                  <div className="flex-1 overflow-y-auto space-y-2 max-h-[290px] pr-2 scrollbar-thin">
                    {videoTracks.map((track, i) => (
                      <button
                        key={track.id || i}
                        onClick={() => {
                          setCurrentVideoIndex(i);
                          setIsPlaying(true);
                        }}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg border text-left transition ${
                          currentVideoIndex === i
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border-gray-100 dark:border-gray-700"
                        }`}
                      >
                        <div className="w-16 aspect-video rounded bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden shrink-0 relative">
                          {track.thumbnail?.url ? (
                            <img
                              src={getMediaSourceUrl(track.thumbnail)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Tv
                              className="w-4 h-4"
                              style={{ color: textColor }}
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-medium text-xs truncate"
                            style={{ color: dark ? "#ffffff" : "#1f2937" }}
                          >
                            {track.title}
                          </h4>
                          <p
                            className="text-[10px]"
                            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                          >
                            Session {i + 1}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TYPE 3: TIMER ── */}
          {mediaType === "TIMER" && (
            <div className="flex flex-col items-center py-4">
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                  onClick={() =>
                    handleSelectDurationLevel(
                      "beginner",
                      durationCard.beginnerDuration
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    activeDurationLevel === "beginner"
                      ? "bg-primary text-white border-primary"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                  }`}
                  style={{
                    backgroundColor:
                      activeDurationLevel === "beginner"
                        ? "#9A85FE"
                        : undefined,
                    borderColor:
                      activeDurationLevel === "beginner"
                        ? "#9A85FE"
                        : undefined,
                    color:
                      activeDurationLevel === "beginner"
                        ? "#ffffff"
                        : dark
                        ? "#e5e7eb"
                        : "#374151",
                  }}
                >
                  Beginner ({durationCard.beginnerDuration}m)
                </button>

                <button
                  onClick={() =>
                    handleSelectDurationLevel(
                      "intermediate",
                      durationCard.intermediateDuration
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    activeDurationLevel === "intermediate"
                      ? "bg-primary text-white border-primary"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                  }`}
                  style={{
                    backgroundColor:
                      activeDurationLevel === "intermediate"
                        ? "#9A85FE"
                        : undefined,
                    borderColor:
                      activeDurationLevel === "intermediate"
                        ? "#9A85FE"
                        : undefined,
                    color:
                      activeDurationLevel === "intermediate"
                        ? "#ffffff"
                        : dark
                        ? "#e5e7eb"
                        : "#374151",
                  }}
                >
                  Intermediate ({durationCard.intermediateDuration}m)
                </button>

                <button
                  onClick={() =>
                    handleSelectDurationLevel(
                      "expert",
                      durationCard.expertDuration
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    activeDurationLevel === "expert"
                      ? "bg-primary text-white border-primary"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                  }`}
                  style={{
                    backgroundColor:
                      activeDurationLevel === "expert" ? "#9A85FE" : undefined,
                    borderColor:
                      activeDurationLevel === "expert" ? "#9A85FE" : undefined,
                    color:
                      activeDurationLevel === "expert"
                        ? "#ffffff"
                        : dark
                        ? "#e5e7eb"
                        : "#374151",
                  }}
                >
                  Expert ({durationCard.expertDuration}m)
                </button>

                <button
                  onClick={() =>
                    handleSelectDurationLevel(
                      "advanced",
                      durationCard.advancedDuration
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    activeDurationLevel === "advanced"
                      ? "bg-primary text-white border-primary"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                  }`}
                  style={{
                    backgroundColor:
                      activeDurationLevel === "advanced"
                        ? "#9A85FE"
                        : undefined,
                    borderColor:
                      activeDurationLevel === "advanced"
                        ? "#9A85FE"
                        : undefined,
                    color:
                      activeDurationLevel === "advanced"
                        ? "#ffffff"
                        : dark
                        ? "#e5e7eb"
                        : "#374151",
                  }}
                >
                  Advanced ({durationCard.advancedDuration}m)
                </button>
              </div>

              <div className="relative w-44 h-44 flex items-center justify-center mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r={strokeRadius}
                    className="stroke-gray-100 dark:stroke-gray-800"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r={strokeRadius}
                    className="transition-all duration-300"
                    stroke="#9A85FE"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={strokeCircumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center">
                  <span
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: dark ? "#ffffff" : "#1f2937" }}
                  >
                    {formatTimeStr(timerRemaining)}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wider font-medium mt-0.5"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    {timerRunning ? "Meditating" : "Paused"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerRemaining(timerDuration);
                  }}
                  className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 border transition shadow-sm"
                  style={{
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    color: dark ? "#e5e7eb" : "#4b5563",
                  }}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: textColor, color: "#ffffff" }}
                >
                  {timerRunning ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </button>

                <div className="w-11" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}