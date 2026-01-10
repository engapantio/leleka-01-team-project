import { useRouter } from "next/navigation";
import DiaryListPlaceholder from "../DiaryListPlaceholder/page";
import type { DiaryEntry } from "@/lib/api/api";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

interface DiaryListProps {
    entries: DiaryEntry[] | null;
    isDesktop: boolean;
    onSelectEntry: (entry: DiaryEntry) => void;
    onAdd: () => void;
}

export default function DiaryList({ entries, isDesktop, onSelectEntry, onAdd }: DiaryListProps) {

    const router = useRouter();

    const handleEntryClick = (entry: DiaryEntry) => {
        if (isDesktop) {
            onSelectEntry(entry);
        } else {
            router.push(`/diary/${entry.id}`);
        }
    };

    return (
        <div>
            <div>
                <h2>Щоденник</h2>
                <div>
                    <p>Новий запис</p>
                    <button onClick={onAdd}></button>
                </div>
            </div>
            {!entries || entries.length === 0 ? (
                <DiaryListPlaceholder />
            ) : (<ul>
                    {entries.map((entry) => (<li key={entry.id}>
                        < DiaryEntryCard entry={entry}
                            onClick={() => handleEntryClick(entry)}
                        />
                    </li>
                    ))}
            </ul>
            )}
        </div>
    );
}