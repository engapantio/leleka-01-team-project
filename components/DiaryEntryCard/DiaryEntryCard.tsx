
import type { DiaryEntry } from '@/lib/api/api';

interface DiaryEntryCardProps {
    entry: DiaryEntry;
    onClick: () => void;
}

export default function DiaryEntryCard({ entry, onClick }: DiaryEntryCardProps) {

    return (
        <div onClick={onClick}>
            <h3>{entry.title}</h3>
            <p>{entry.date}</p>
            {entry.emotions.length > 0 && (
                <ul>
                    {entry.emotions.map(emotion => (
                        <li key={emotion.id}>{emotion.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}