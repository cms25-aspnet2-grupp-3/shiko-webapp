"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { getHeaderUser, HeaderUser } from "@/services/headerService";

export default function Header() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [user, setUser] = useState<HeaderUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadHeaderUser() {
            try {
                const data = await getHeaderUser();
                setUser(data);
            } catch (error) {
                console.error("Failed to load header user:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadHeaderUser();
    }, []);

    const fullName = user
        ? `${user.fullName}`
        : "Guest User";

    const email = user?.email ?? "No email available";

    const profileImageUrl =
        user?.profileImageUrl ??
        "https://shikoimagestoragegrp3.blob.core.windows.net/images/profile-sample.png";

    return (
        <header className={styles.header}>
            <form className={styles["search-bar"]}>
                <button type="submit" className={styles["submit"]}>
                    <Image
                        src="/icons/icon-search.svg"
                        alt="Search"
                        width={16}
                        height={16}
                    />
                </button>

                <input type="text" placeholder="Search..." />
            </form>

            <div className={styles["right-section"]}>
                <button type="button" className={styles.button}>
                    <Image
                        src="/icons/icon.svg"
                        alt="Mail"
                        width={21.18}
                        height={18}
                    />
                </button>

                <div className={styles.divider}></div>

                <button type="button" className={styles.button}>
                    <Image
                        src="/icons/notification.svg"
                        alt="Notification"
                        width={15.3}
                        height={18}
                    />
                </button>

                <div className={styles.divider}></div>

                <div className={styles["user-profile"]}>
                    <div
                        className={`${styles["user-profile"]} cursor-pointer ${isProfileModalOpen ? "opacity-0 pointer-events-none" : ""
                            }`}
                        onClick={() => setIsProfileModalOpen(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setIsProfileModalOpen(true);
                            }
                        }}
                    >
                        <div className={styles["user-image"]}>
                            <Image
                                src={profileImageUrl}
                                alt="Profile"
                                width={60}
                                height={60}
                            />
                        </div>

                        <div className={styles["user-info"]}>
                            <span className={styles["user-name"]}>
                                {isLoading ? "Loading..." : fullName}
                            </span>

                            <span className={styles["user-email"]}>
                                {isLoading ? "" : email}
                            </span>
                        </div>
                    </div>



                    <div
                        className={`absolute right-0 top-0 z-50 w-80 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5
                                    transform transition-all duration-200 ease-out
                            ${isProfileModalOpen
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={profileImageUrl}
                                    alt="Profile"
                                    width={52}
                                    height={52}
                                    className="rounded-full"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        {fullName}
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        {email}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsProfileModalOpen(false)}
                                    type="button"
                                    className="flex w-full items-center justify-between cursor-pointer rounded-xl px-3 py-2 transition hover:bg-[#F9CCC8]"
                                >
                                    Show Profile
                                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                                </Link>

                                <Link
                                    href="/settings"
                                    onClick={() => setIsProfileModalOpen(false)}
                                    type="button"
                                    className="flex w-full items-center justify-between cursor-pointer rounded-xl px-3 py-2 transition hover:bg-[#F9CCC8]"
                                >
                                    Settings
                                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                                </Link>

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between cursor-pointer rounded-xl px-3 py-2 transition hover:bg-[#F9CCC8]"
                                >
                                    Log Out
                                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsProfileModalOpen(false)}
                                className="mt-4 w-full rounded-xl bg-[#E9ECF3] cursor-pointer px-3 py-2 transition hover:bg-[#BAC4D9]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}