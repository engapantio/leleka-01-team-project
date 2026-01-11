"use client";

import { useEffect, useState } from "react";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryEntry } from "@/types/diary";
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
                const res = await fetchDiaryEntries();
                setEntries(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEntries();
    }, []);
    
    const handleAdd = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <div>
                <DiaryList
                    isDesktop={isDesktop}
                    onSelectEntry={setSelectedEntry}
                    entries={entries}
                    onAdd={handleAdd} />
                
                {isDesktop && selectedEntry && (
                    <DiaryEntryDetails
                        entry={selectedEntry} />
                )}
            </div>
            {isModalOpen && <></>}
        </div>
    );
}