interface DiaryEntry {
    id: string;
    title: string;
    date: string;
    content: string;
    emotions: string[];
}

interface DiaryEntryDetailsProps {
    entry: DiaryEntry | null;
    onEdit: (entry: DiaryEntry) => void;
    onDelete: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({ entry, onEdit, onDelete}: DiaryEntryDetailsProps) {
    if (!entry) return
        <p>Оберіть запис</p>;
    
    
    return (
        <div>
            <div>
                <h2>{entry.title}</h2>
                <button onClick={() => onEdit(entry)}></button>
            </div>
            <div>
                <p>{entry.date}</p>
                <button onClick={() => onDelete(entry)}></button>
            </div>
        </div>
    );
}