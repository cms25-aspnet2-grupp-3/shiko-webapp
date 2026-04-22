import styles from "./Header.module.css";
import Image from "next/image";


export default function Header() {
    return (
        <header className={styles.header}>
            <form className={styles["search-bar"]}>
                <button type="submit" className={styles["submit"]}>
                    <Image src="/icons/icon-search.svg" alt="Search" width={16} height={16} />
                </button>
                <input type="text" placeholder="Search..." />
            </form>

            <div className={styles["right-section"]}>
                <button className={styles.button}>
                    <Image src="/icons/icon.svg" alt="Mail" width={21.18} height={18} />
                </button>
                <div className={styles.divider}></div>
                <button className={styles.button}>
                    <Image src="/icons/notification.svg" alt="Notification" width={15.3} height={18} />
                </button>
                <div className={styles.divider}></div>

                <div className={styles["user-profile"]}>
                    <button className={styles["user-image"]}>
                        <Image src="/images/profile-sample.png" alt="Notification" width={60} height={60} />
                    </button>
                    <div className={styles["user-info"]}>
                        <span className={styles["user-name"]}>Oscar Taberman</span>
                        <span className={styles["user-email"]}>oscar.taberman@example.com</span>
                    </div>
                </div>
            </div>
        </header>
    );
}