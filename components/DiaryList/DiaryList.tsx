interface DiaryEntry {
    id: string;
    title: string;
    date: string;
    content: string;
    emotions: string[];
}

interface DiaryListProps {
    entries: DiaryEntry[];
    isDesktop: boolean;
    onSelectEntry: (entry: DiaryEntry) => void;
    onAdd: () => void;
}

export default function DiaryList({ entries, isDesktop, onSelectEntry, onAdd }: DiaryListProps) {
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
                <p>Наразі записи у щоденнику відсутні</p>
            ) : (
                entries.map(entry => (
                    <div key={entry.id}
                        onClick={() => {
                            if (isDesktop) {
                                onSelectEntry(entry);
                            } else {
                                window.location.href = `diary/${entry.id}`
                            };
                        }}>
                        <h3>{entry.title}</h3>
                        <p>{entry.date}</p>
                        <div>{entry.emotions.join(' ')}</div>
                    </div>
                ))
            )}
        </div>
    );
}