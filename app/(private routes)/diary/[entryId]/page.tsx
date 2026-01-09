"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { DiaryEntry } from "@/lib/api/api";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";



export default function DiaryEntryIdPage() {
    const { entryId } = useParams();
    const router = useRouter();

    const [entry, setEntry] = useState<DiaryEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        if (!entryId) return;

        const fetchEntry = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/diary/${entryId}`);
                if (!res.ok) throw new Error("Не вдалося завантажити запис");
                const data: DiaryEntry = await res.json();
                setEntry(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error("Сталася невідома помилка");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntry();
    }, [entryId]);

    const handleEdit = (entry: DiaryEntry) => setIsEditModalOpen(true);
    const handleDelete = (entry: DiaryEntry) => setIsDeleteModalOpen(true);

    const handleDeleteConfirm = async () => {
        if (!entry || !entryId) return;

        try {
            const res = await fetch(`/api/diary/${entryId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Не вдалося видалити запис");
            toast.success("Запис успішно видалено");
            router.push("/diary");
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    if (isLoading) return <p>Завантаження...</p>;
    if (!entry) return <p>Запис не знайдено</p>;

    return (
        <div>
            <DiaryEntryDetails entry={entry}
                onEdit={handleEdit}
                onDelete={handleDelete} />
            {isEditModalOpen && (
                <AddDiaryEntryModal entry={entry}
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={(updateEntry: DiaryEntry) => {
                        setEntry(updateEntry);
                        setIsEditModalOpen(false);
                        toast.success("Запис успішно оновлено");
                    }}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmationModal onConfirm={handleDeleteConfirm}
                    onCancel={() => setIsDeleteModalOpen(false)} />
            )}
        </div>
    );
}