 export default function dateTransform(iso?: string | null): string {
    if (!iso) return "—";
    return iso.slice(8, 10) + "." + iso.slice(5, 7) + "." + iso.slice(0, 4);
}