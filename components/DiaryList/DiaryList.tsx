import { useRouter } from "next/navigation";
import DiaryListPlaceholder from "../DiaryListPlaceholder/DiaryListPlaceholder";
import type { DiaryEntry } from "@/types/diary";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import css from "./DiaryList.module.css";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { useDiaryStore } from "@/lib/store/diaryStore";


interface DiaryListProps {
    entries: DiaryEntry[];
    loading: boolean;
    onSelectEntry: (entry: DiaryEntry) => void;
    onAdd: () => void;
}

export default function DiaryList({ entries, loading, onSelectEntry, onAdd }: DiaryListProps) {


    const router = useRouter();

const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth >= 1440 : true);

   useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1440);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
const setSelectedEntry = useDiaryStore(s => s.setSelectedEntry);

    const handleEntryClick = (entry: DiaryEntry) => {
        setSelectedEntry(entry);
        if (isDesktop) {
            onSelectEntry(entry);
        } else {
            router.push(`/diary/${entry.id}`);
        }
    };


    if (loading) {
        return <Loader />
    }

    return (
        <div className={css.container}>
            <div className={css.topContainer}>
                <h2 className={css.title}>Щоденник</h2>
                <div className={css.btnContainer}>
                    <p className={css.btnName}>Новий запис</p>
                    <button className={css.btn} onClick={onAdd}><svg width="24" height="24" viewBox="0 0 32 32">
    <use href="/sprite.svg#add-icon" />
                    </svg>
                    </button>
                </div>
            </div>
            <div className={css.scrollWrapper}>
            {!entries || entries.length === 0 ? (
                <DiaryListPlaceholder />
            ) : (<ul className={css.list}>
                    {entries.map((entry) => (<li className={css.listItem} key={entry.id}>
                        < DiaryEntryCard entry={entry} key={entry.id}
                            onClick={() => handleEntryClick(entry)}
                        />
                    </li>
                    ))}
                </ul> 
                )}
                </div>
        </div>
    );
}