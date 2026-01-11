import DiaryEntryDetailsPlaceholder from "../DiaryEntryDetailsPlaceholder/DiaryEntryDetailsPlaceholder";
import type { DiaryEntry } from "@/types/diary";
import css from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
    entry: DiaryEntry | null;
onEdit?: (entry: DiaryEntry) => void;
    onDelete?: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: DiaryEntryDetailsProps) {


    if (!entry) { return <DiaryEntryDetailsPlaceholder />; }

    
    return (
        <div className={css.container}>
            <div className={css.titleContainer}>
                <h2 className={css.title}>{entry.title}</h2>
                <button onClick={() => onEdit?.(entry)}></button>
            </div>
            <div className={css.dateContainer}>
                <p className={css.date}>{entry.date}</p>
                <button onClick={()=> onDelete?.(entry)}></button>
            </div>
            <div>
                <p className={css.text}>{entry.description}</p>
                {entry.emotions.length > 0 && (
                    <ul>
                        {entry.emotions.map(emotion => (
                            <li className={css.emotions} key={emotion.id}>{emotion.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}