import css from "./DairyListPlaceholder.module.css"

export default function DiaryListPlaceholder() {
    return (
        <div>
            <p className={css.text}>Наразі записи у щоденнику відсутні</p>
        </div>
    );
}