import css from "./DiaryEntryCard.module.css";
import type { DiaryEntry } from '@/types/diary';

interface DiaryEntryCardProps {
    entry: DiaryEntry;
    onClick: () => void;
}

export default function DiaryEntryCard({ entry, onClick }: DiaryEntryCardProps) {

    return (
        <div className={css.container} onClick={onClick}>
            <div className={css.titleContainer}>
            <h3 className={css.title}>{entry.title}</h3>
                <p className={css.date}>{entry.date}</p>
                </div>
            {entry.emotions.length > 0 && (
                <ul className={css.list}>
                    {entry.emotions.map(emotion => (
                        <li className={css.emotions} key={emotion.id}>{emotion.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}