import { useRouter } from "next/navigation";
import DiaryListPlaceholder from "../DiaryListPlaceholder/page";
import type { DiaryEntry } from "@/lib/api/api";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import css from "./DiaryList.module.css";


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
        <div className={css.container}>
            <div className={css.topContainer}>
                <h2 className={css.title}>Щоденник</h2>
                <div className={css.btnContainer}>
                    <p className={css.btnName}>Новий запис</p>
                    <button onClick={onAdd}><svg>
    <use href="../../public/sprite.svg#add-icon" />
                    </svg>
                    </button>
                </div>
            </div>
            {!entries || entries.length === 0 ? (
                <DiaryListPlaceholder />
            ) : (<ul className={css.list}>
                    {entries.map((entry) => (<li className={css.listItem} key={entry.id}>
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