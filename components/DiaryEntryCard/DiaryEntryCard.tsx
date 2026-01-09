import { useRouter } from 'next/router';
import type { DiaryEntry } from '@/lib/api/api';

interface DiaryEntryCardProps {
    entry: DiaryEntry;
    isDesktop: boolean;
    onClick: (entry: DiaryEntry) => void;
}

export default function DiaryEntryCard({ entry, isDesktop, onClick }: DiaryEntryCardProps) {
    const router = useRouter();

    const handleClick = () => {
        if (isDesktop) {
            onClick(entry);
        } else {
            router.push(`/diary/${entry.id}`)
        }
    };

    return (
        <div onClick={handleClick}>
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