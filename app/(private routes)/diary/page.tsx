"use client";

import { useEffect, useState } from "react";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryEntry } from "@/types/diary";
import { fetchDiaryEntries } from "@/lib/api/clientApi";



export default function DiaryPage() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)

    const [isDesktop, setIsDesktop] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkScreen = () => setIsDesktop(window.innerWidth >= 1440);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const fetchEntries = async () => {
            setLoading(true);
            try {
                const res = await fetchDiaryEntries();
                setEntries(res);
            } catch (err) {
                console.error(err);
                setEntries([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);
    


    return (
        <div>
            <div>
                <DiaryList
                    loading={loading}
                    onSelectEntry={setSelectedEntry}
                    entries={entries} />
                
                {isDesktop && selectedEntry && (
                    <DiaryEntryDetails
                        entry={selectedEntry} />
                )}
            </div>
        </div>
    );
}
