"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDiaryStore } from "../../../../lib/store/diaryStore";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";

export default function DiaryEntryPage() {
  const router = useRouter();
  const params = useParams<{ entryId: string }>();

  const selectedEntry = useDiaryStore(
    (s) => s.selectedEntry
  );

  useEffect(() => {

    if (!selectedEntry || selectedEntry.id !== params.entryId) {
      router.replace("/diary");
    }
  }, [selectedEntry, params.entryId, router]);

  if (!selectedEntry) {
    return null; 
  }

  return (
    <DiaryEntryDetails
      entry={selectedEntry}
    />
  );
}
