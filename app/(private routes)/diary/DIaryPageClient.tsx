"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from './DIaryPageClient.module.css';
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { fetchDiaryEntries } from "@/lib/api/clientApi";
import { DiaryEntry } from "@/types/diary";
import DiaryListPlaceholder from "@/components/DiaryListPlaceholder/DiaryListPlaceholder";
import DiaryEntryDetailsPlaceholder from "@/components/DiaryEntryDetailsPlaceholder/DiaryEntryDetailsPlaceholder";

export default function DiaryPageClient() {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1440);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  const { data: entries = [], isLoading, isError } = useQuery({
    queryKey: ['diaries'],
    queryFn: fetchDiaryEntries,
    staleTime: 1000 * 60,
  });

  if (isError) {
  return <p className={css.error}>Помилка завантаження записів</p>;
}

  const hasEntries = entries.length > 0;


  const handleSelectEntry = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    if (!isDesktop) {

      window.location.href = `/diary/${entry.id}`;
    }
  };



  return (
  <div className={css.app}>
    {isLoading && <p className={css.loader}>Завантаження записів...</p>}

    {isDesktop && (
      <div className={css.desktopLayout}>
        <DiaryList
          entries={entries}
          loading={false}
          onAdd={() => {}}
          onSelectEntry={handleSelectEntry}
          />
          
        <div>
            {hasEntries && selectedEntry ? (
              <DiaryEntryDetails
                entry={selectedEntry}
                onEdit={() => {} }
              onDelete={()=> {}}
            />
          ) : <DiaryEntryDetailsPlaceholder />}
        </div>
      </div>
    )}

    {!isDesktop && (
      <>
          {hasEntries ? (
            <DiaryList
              entries={entries}
              loading={false}
              onAdd={()=> {}}
              onSelectEntry={handleSelectEntry}
            />
          ) : <DiaryListPlaceholder />}
      </>
    )}
    </div>
  );
}
