"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { yogaNidraService, mudraService } from "../../services/apiService";
import UpNextWithMiniPlayer from "../../components/PlaySession/UpNextWithMiniPlayer";
import SessionPlayerHero from "../../components/PlaySession/SessionPlayerHero";

function PlaySessionContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "ui2phqjaaqub5r1k38gkppko";
  const type = searchParams.get("type") || "yoganidra";
  const mode = searchParams.get("mode") || "guided";
  const durationParam = searchParams.get("duration"); // e.g. "300" (seconds)
  
  const [detailData, setDetailData] = useState(null);
  const isMudra = type === "mudra";

  const getProfileDocId = () => {
    if (typeof window !== "undefined") {
      try {
        const userObjStr = localStorage.getItem("user");
        if (userObjStr) {
          const userObj = JSON.parse(userObjStr);
          if (userObj && userObj.id) {
            return userObj.id;
          }
        }
      } catch (e) {
        console.error("Error reading user from localStorage:", e);
      }
    }
    return null;
  };
  const loggedInProfileDocId = getProfileDocId() || "nh0p1vtynpr7mge2orest5mt";

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [totalSecs, setTotalSecs] = useState(0);

  useEffect(() => {
    async function loadDetail() {
      try {
        let json;
        if (isMudra) {
          json = await mudraService.getMudraDetail(id, loggedInProfileDocId);
        } else {
          json = await yogaNidraService.getYogaNidraById(id, loggedInProfileDocId);
        }
        let finalData = null;
        if (json && json.success && json.data) {
          finalData = json.data;
        } else if (json && json.data) {
          finalData = json.data;
        } else if (json) {
          finalData = json;
        }
        if (finalData && finalData.data) {
          finalData = finalData.data;
        }
        setMudraViewsIfNeeded(finalData);
        setDetailData(finalData);
      } catch (err) {
        console.warn("Failed fetching session detail for player, using fallbacks:", err);
      }
    }
    if (id) {
      loadDetail();
    }
  }, [id, loggedInProfileDocId, isMudra]);

  const setMudraViewsIfNeeded = async (mudraData) => {
    if (!isMudra || !mudraData) return;
    const docId = mudraData.documentId || mudraData.id;
    if (docId) {
      try {
        await mudraService.incrementMudraView(docId, loggedInProfileDocId);
      } catch (vErr) {
        console.warn("Failed to increment mudra view count on play session:", vErr);
      }
    }
  };

  const actualData = detailData?.data || detailData;

  // Resolve playlist tracks dynamically based on Mudra/Yoga Nidra schema structure
  const playlistTracks = isMudra
    ? (
        actualData?.mediaType === "AUDIO_SINGLE"
          ? (actualData?.audioSingleSessions || [])
          : actualData?.mediaType === "AUDIO_PLAYLIST"
            ? (actualData?.audio_playlists?.[0]?.audios || actualData?.audio_playlists || [])
            : actualData?.mediaType === "VIDEO_SINGLE"
              ? (actualData?.videoSingleSessions || [])
              : actualData?.mediaType === "VIDEO_PLAYLIST"
                ? (actualData?.video_playlists?.[0]?.videos || actualData?.video_playlists || [])
                : []
      )
    : (
        (actualData?.AudioSingleSessions && actualData.AudioSingleSessions.length > 0)
          ? actualData.AudioSingleSessions
          : (actualData?.AudioPlaylist?.[0]?.audios || [])
      );

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <SessionPlayerHero
        sessionData={detailData}
        type={type}
        mode={mode}
        durationParam={durationParam}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        playing={playing}
        setPlaying={setPlaying}
        current={current}
        setCurrent={setCurrent}
        totalSecs={totalSecs}
        setTotalSecs={setTotalSecs}
        playlistTracks={playlistTracks}
      />
      {playlistTracks && playlistTracks.length > 0 && (
        <UpNextWithMiniPlayer
          playlistTracks={playlistTracks}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
          playing={playing}
          setPlaying={setPlaying}
          current={current}
          totalSecs={totalSecs}
        />
      )}
    </main>
  );
}

export default function PlaySession() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Session Player...</div>}>
      <PlaySessionContent />
    </Suspense>
  );
}
