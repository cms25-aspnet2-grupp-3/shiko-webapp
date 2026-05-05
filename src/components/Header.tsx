"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import {
    getHeaderUser,
    getHeaderMessages,
    getHeaderNotifications,
    HeaderUser,
    HeaderMessage,
    HeaderNotification
} from "@/services/headerService";

export default function Header() {
    const router = useRouter();

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [user, setUser] = useState<HeaderUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [messages, setMessages] = useState<HeaderMessage[]>([]);
    const [notifications, setNotifications] = useState<HeaderNotification[]>([]);

    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);

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
    useEffect(() => {
        async function loadHeaderMessages() {
            try {
                const data = await getHeaderMessages();
                setMessages(data);
            } catch (error) {
                console.error("Failed to load header messages:", error);
            } finally {
                setIsMessagesLoading(false);
            }
        }

        loadHeaderMessages();
    }, []);
    useEffect(() => {
        async function loadHeaderNotifications() {
            try {
                const data = await getHeaderNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Failed to load header notifications:", error);
            } finally {
                setIsNotificationsLoading(false);
            }
        }

        loadHeaderNotifications();
    }, []);

    const fullName = user
        ? `${user.fullName}`
        : "Guest User";

    const email = user?.email ?? "No email available";

    const profileImageUrl =
        user?.profileImageUrl ??
        "https://shikoimagestoragegrp3.blob.core.windows.net/images/profile-sample.png";

    function openProfileModal() {
        setIsProfileModalOpen(true);
        setIsMessagesOpen(false);
        setIsNotificationsOpen(false);
    }

    function toggleMessages() {
        setIsMessagesOpen((current) => !current);
        setIsNotificationsOpen(false);
        setIsProfileModalOpen(false);
    }

    function toggleNotifications() {
        setIsNotificationsOpen((current) => !current);
        setIsMessagesOpen(false);
        setIsProfileModalOpen(false);
    }

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedQuery = searchQuery.trim();

        if (!trimmedQuery) {
            return;
        }

        router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }

    return (
        <header className={styles.header}>
            <form className={styles["search-bar"]} onSubmit={handleSearch}>
                <button type="submit" className={styles["submit"]}>
                    <Image
                        src="/icons/icon-search.svg"
                        alt="Search"
                        width={16}
                        height={16}
                    />
                </button>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </form>

            <div className={styles["right-section"]}>
                <div className="relative">
                    <button
                        type="button"
                        className={styles.button}
                        onClick={toggleMessages}
                        aria-label="Open messages"
                    >
                        <Image
                            src="/icons/icon.svg"
                            alt="Mail"
                            width={21}
                            height={18}
                        />
                    </button>

                    <div
                        className={`absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5
                                    transform transition-all duration-200 ease-out
                                ${isMessagesOpen
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            }`}
                    >
                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-slate-900">
                                Messages
                            </h3>

                            <div className="mt-4 space-y-3">
                                {isMessagesLoading ? (
                                    <p className="text-sm text-slate-500">
                                        Loading messages...
                                    </p>
                                ) : messages.length === 0 ? (
                                    <p className="text-sm text-slate-500">
                                        No messages available.
                                    </p>
                                ) : (
                                    messages.map((message) => (
                                        <Link
                                            key={message.id}
                                            href={`/${message.url}`}
                                            onClick={() => setIsMessagesOpen(false)}
                                            className={`flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#F9CCC8] ${message.isRead ? "bg-white" : "bg-slate-50"
                                                }`}
                                        >
                                            <Image
                                                src={message.senderImageUrl}
                                                alt={message.senderName}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="truncate text-sm font-medium text-slate-900">
                                                        {message.senderName}
                                                    </p>

                                                    {!message.isRead && (
                                                        <span className="h-2 w-2 rounded-full bg-[#F9CCC8]" />
                                                    )}
                                                </div>

                                                <p className="truncate text-xs text-slate-500">
                                                    {message.previewText}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>

                            <Link
                                href="/messages"
                                onClick={() => setIsMessagesOpen(false)}
                                className="mt-4 block w-full rounded-xl bg-[#E9ECF3] px-3 py-2 text-center text-sm transition hover:bg-[#BAC4D9]"
                            >
                                View all messages
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className="relative">
                    <button
                        type="button"
                        className={styles.button}
                        onClick={toggleNotifications}
                        aria-label="Open notifications"
                    >
                        <Image
                            src="/icons/notification.svg"
                            alt="Notification"
                            width={15}
                            height={18}
                        />
                    </button>

                    <div
                        className={`absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5
                                    transform transition-all duration-200 ease-out
                                ${isNotificationsOpen
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            }`}
                    >
                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-slate-900">
                                Notifications
                            </h3>

                            <div className="mt-4 space-y-3">
                                {isNotificationsLoading ? (
                                    <p className="text-sm text-slate-500">
                                        Loading notifications...
                                    </p>
                                ) : notifications.length === 0 ? (
                                    <p className="text-sm text-slate-500">
                                        No notifications available.
                                    </p>
                                ) : (
                                    notifications.map((notification) => (
                                        <Link
                                            key={notification.id}
                                            href={`/${notification.url}`}
                                            onClick={() => setIsNotificationsOpen(false)}
                                            className={`block rounded-xl p-3 transition hover:bg-[#F9CCC8] ${notification.isRead ? "bg-white" : "bg-slate-50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {notification.title}
                                                </p>

                                                {!notification.isRead && (
                                                    <span className="h-2 w-2 rounded-full bg-[#F9CCC8]" />
                                                )}
                                            </div>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {notification.message}
                                            </p>

                                            <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-400">
                                                {notification.type}
                                            </p>
                                        </Link>
                                    ))
                                )}
                            </div>

                            <Link
                                href="/notifications"
                                onClick={() => setIsNotificationsOpen(false)}
                                className="mt-4 block w-full rounded-xl bg-[#E9ECF3] px-3 py-2 text-center text-sm transition hover:bg-[#BAC4D9]"
                            >
                                View all notifications
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles["user-profile"]}>
                    <div
                        className={`${styles["user-profile"]} cursor-pointer ${isProfileModalOpen ? "opacity-0 pointer-events-none" : ""
                            }`}
                        onClick={openProfileModal}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                openProfileModal();
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