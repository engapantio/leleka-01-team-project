import { useRouter } from 'next/router';


interface DiaryEntry {
    id: string;
    title: string;
    date: string;
    content: string;
    emotions: string[];
}

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
            <div>{entry.emotions.join(' ')}</div>
        </div>
    );
}