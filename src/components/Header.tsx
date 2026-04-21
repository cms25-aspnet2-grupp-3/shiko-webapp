import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
                <div className={styles["search-bar"]}></div>

                <div className={styles["right-section"]}>
                    <button className={styles.button}></button>
                    <div className={styles.divider}></div>
                    <button className={styles.button}></button>
                    <div className={styles.divider}></div>

                    <div className={styles["user-profile"]}>
                        <span className={styles["user-image"]}></span>
                        <div className={styles["user-info"]}>
                            <span className={styles["user-name"]}>Oscar Taberman</span>
                            <span className={styles["user-email"]}>oscar.taberman@example.com</span>
                        </div>
                    </div>
                </div>
        </header>
    );
}