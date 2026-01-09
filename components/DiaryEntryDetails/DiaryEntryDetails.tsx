import { useState } from "react";
import DiaryEntryDetailsPlaceholder from "../DiaryEntryDetailsPlaceholder/page";
import type { DiaryEntry } from "@/lib/api/api";

interface DiaryEntryDetailsProps {
    entry: DiaryEntry | null;
onEdit?: (entry: DiaryEntry) => void;
    onDelete?: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: DiaryEntryDetailsProps) {


    if (!entry) { return <DiaryEntryDetailsPlaceholder />; }

    
    return (
        <div>
            <div>
                <h2>{entry.title}</h2>
                <button onClick={() => onEdit?.(entry)}></button>
            </div>
            <div>
                <p>{entry.date}</p>
                <button onClick={()=> onDelete?.(entry)}></button>
            </div>
            <div>
                <p>{entry.description}</p>
                {entry.emotions.length > 0 && (
                    <ul>
                        {entry.emotions.map(emotion => (
                            <li key={emotion.id}>{emotion.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}