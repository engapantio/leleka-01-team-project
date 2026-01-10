const DiaryPage = () => {
  return <div>DiaryPage</div>;
};

export default DiaryPage;
"use client";

import { useEffect, useState } from "react";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryEntry } from "@/lib/api/api";
import { fetchDiaryEntries } from "@/lib/api/clientApi";



export default function DiaryPage() {
    const [entries, setEntries] = useState<DiaryEntry[] | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)

    const [isDesktop, setIsDesktop] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetchDiaryEntries(token);
                setEntries(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEntries();
    }, [isDesktop]);
    
    const handleAdd = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <div>
                <DiaryList
                    isDesktop={isDesktop}
                    onSelectEntry={(entry) => setSelectedEntry(entry)}
                    entries={entries}
                    onAdd={handleAdd} />
                
                {isDesktop && (
                    <DiaryEntryDetails
                        entry={selectedEntry} />
                )}
            </div>
            {isModalOpen && <></>}
        </div>
    );
}