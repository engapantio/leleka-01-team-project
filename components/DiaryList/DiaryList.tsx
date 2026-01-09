import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DiaryListPlaceholder from "../DiaryListPlaceholder/page";
import type { DiaryEntry } from "@/lib/api/api";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import toast from "react-hot-toast";

interface DiaryListProps {
    entries: DiaryEntry[] | null;
    isDesktop: boolean;
    onSelectEntry: (entry: DiaryEntry) => void;
    onAdd: () => void;
}

export default function DiaryList({ isDesktop, onSelectEntry, onAdd }: DiaryListProps) {

    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch("/api/diaries");
                if (!res.ok) throw new Error("Упс... Сталася помилка при завантаженні записів");
                const data: { date: string;  entries: DiaryEntry[]} = await res.json();
                setEntries(data.entries);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error("Сталася невідома помилка")
                }
            }
        };
        fetchEntries();
    }, []);

    return (
        <div>
            <div>
                <h2>Щоденник</h2>
                <div>
                    <p>Новий запис</p>
                    <button onClick={onAdd}></button>
                </div>
            </div>
            {entries.length === 0 ? (
                <DiaryListPlaceholder />
            ) : (
                entries.map(entry => (
                    < DiaryEntryCard key={entry.id} entry={entry} isDesktop={isDesktop}
                        onClick={() => {
                            if (isDesktop) {
                                onSelectEntry(entry);
                            } else {
                                router.push(`/diary/${entry.id}`)
                            };
                        }}
                    />
                ))
            )}
        </div>
    );
}