"use client";

import DiaryEntryDetailsPlaceholder from "../DiaryEntryDetailsPlaceholder/DiaryEntryDetailsPlaceholder";
import type { DiaryEntry } from "@/types/diary";
import css from "./DiaryEntryDetails.module.css";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import dateTransform from "../../utils/dateTransform"


interface DiaryEntryDetailsProps {
    entry: DiaryEntry | null;
    isLoading?: boolean;
onEdit?: (entry: DiaryEntry) => void;
    onDelete?: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({ entry, isLoading = false, onEdit, onDelete }: DiaryEntryDetailsProps) {

    const [localEntry, setLocalEntry] = useState<DiaryEntry | null>(entry);

    useEffect(() => {
            setLocalEntry(entry);
    }, [entry]);

    if (isLoading) {
        return <Loader />
    }

    if (!localEntry) { return <DiaryEntryDetailsPlaceholder />; }

    
    return (
        <div className={css.container}>
            <div className={css.infoContainer}>
            <div className={css.titleContainer}>
                <h2 className={css.title}>{localEntry.title}</h2>
                    <button className={css.btn} onClick={() => onEdit?.(localEntry)}>
                        <svg width="24" height="24" viewBox="0 0 32 32">
                    <use href="/sprite.svg#icon-edit_square" />
                </svg>
                </button>
            </div>
            <div className={css.dateContainer}>
                    <p className={css.date}>{dateTransform(localEntry.date)}</p>
                <button className={css.btn} onClick={() => onDelete?.(localEntry)}>
                    <svg width="24" height="24" viewBox="0 0 32 32">
                    <use href="/sprite.svg#icon-delete_forever" />
                </svg>
                </button>
                </div>
                </div>
            <div>
                <p className={css.text}>{localEntry.description}</p>
                {localEntry.emotions.length > 0 && (
                    <ul className={css.list}>
                        {localEntry.emotions.map((emotion) => (
                            <li className={css.emotions} key={emotion.id}>{emotion.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}