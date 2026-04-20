import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
    return (
        <header className={styles.header}>

            <nav className={styles.nav}>
                <div className={styles["left-section"]}>
                    <div className={styles["search-bar"]}></div>
                </div>
                <div className={styles["right-section"]}>
                    <button className={styles.button}></button>
                    <button className={styles.button}></button>
                    <div className={styles["user-profile"]}>
                        <span className={styles["user-image"]}></span>{/* <Image src="" alt="User Profile" className="profile-pic" /> */}
                        <div className={styles["user-info"]}>
                            <span className={styles["user-name"]}>Oscar Taberman</span>
                            <span className={styles["user-email"]}>oscar.taberman@example.com</span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
