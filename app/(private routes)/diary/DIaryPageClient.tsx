"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from './DIaryPageClient.module.css';
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { fetchDiaryEntries } from "@/lib/api/clientApi";
import { DiaryEntry } from "@/types/diary";
import DiaryListPlaceholder from "@/components/DiaryListPlaceholder/DiaryListPlaceholder";

export default function DiaryPageClient() {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const openAddModal = () => setIsAddModalOpen(true);
  // const closeAddModal = () => setIsAddModalOpen(false);

  // const openEditModal = () => setIsEditModalOpen(true);
  // const closeEditModal = () => setIsEditModalOpen(false);

  // const openDeleteModal = () => setIsDeleteModalOpen(true);
  // const closeDeleteModal = () => setIsDeleteModalOpen(false);

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
          ) : null}
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

      {/* {isAddModalOpen && <AddDiaryEntryModal onClose={closeAddModal} />}
      {isEditModalOpen && selectedEntry && (
        <AddDiaryEntryModal entry={selectedEntry} onClose={closeEditModal} />
      )}
      {isDeleteModalOpen && selectedEntry && (
        <ConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={() => console.log("Delete", selectedEntry.id)}
        />
      )} */}
    </div>
  );
}
