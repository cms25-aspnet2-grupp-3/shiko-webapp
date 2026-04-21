import styles from "./Header.module.css";
import Image from "next/image";
import searchIcon from "@/assets/Icons/search-icon.png";

export default function Header() {
    return (
        <header className={styles.header}>
            <form className={styles["search-bar"]}>
                <button type="submit">
                    <Image src={searchIcon} alt="Search" width={40} height={40} />
                </button>
                <input type="text" placeholder="Search..." />
            </form>

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