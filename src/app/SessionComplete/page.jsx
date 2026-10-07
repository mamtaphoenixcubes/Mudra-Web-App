"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SessionFeedback from "../../components/SessionComplete/Sessionfeedback";
import SessionCompleteScreen from "../../components/SessionComplete/Sessioncompletescreen";
import SessionCompleteActions from "../../components/SessionComplete/Sessioncompleteactions";

const formatDuration = (value) => {
  const seconds = Number(value ?? 0);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0 min";
  }

  if (seconds < 60) {
    return `${Math.round(seconds)} sec`;
  }

  return `${Math.floor(seconds / 60)} min`;
};

const formatCompletionDate = (completedAt) => {
  if (!completedAt) {
    const now = new Date();
    return {
      date: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(now),
      time: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now),
    };
  }

  const date = new Date(completedAt);

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
};

export default function SessionComplete() {
  const searchParams = useSearchParams();

  const sessionName = searchParams.get("name") || "Chakra Healing Meditation";
  const completedAt = searchParams.get("completedAt") || new Date().toISOString();
  const lastSessionDuration = Number(searchParams.get("lastSessionDuration") ?? 0);
  const activityDocumentId = searchParams.get("activityDocumentId") || "";
  const sessionType = searchParams.get("type") || "yoga mudra";

  const formatted = useMemo(() => formatCompletionDate(completedAt), [completedAt]);

  return (
    <main>
      <SessionCompleteScreen
        duration={formatDuration(lastSessionDuration)}
        sessionName={sessionName}
        date={formatted.date}
        time={formatted.time}
      />
      <SessionFeedback sessionType={sessionType} />
      <SessionCompleteActions />
    </main>
  );
}
