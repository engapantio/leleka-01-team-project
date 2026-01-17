import css from "./DiaryListPlaceholder.module.css"

export default function DiaryListPlaceholder() {
    return (
        <div className={css.container}>
            <p className={css.text}>Наразі записи у щоденнику відсутні</p>
        </div>
    );
}