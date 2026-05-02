"use client";

import { useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {

    useEffect(() => {
    if (typeof window === "undefined") return;

    const logNotFound = async () => {
        try {
            const response = await fetch("https://localhost:7247/api/monitoring/log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "aZ9kL27mNqP5xR92sQwE"
                },
                body: JSON.stringify({
                    invalidUrl: window.location.href,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.warn("Loggning misslyckades på servern:", errorText);
            }
        } catch (error) {
            console.error("Kunde inte ansluta till API:et:", error);
        }
    };

    logNotFound();
}, []);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-secondary text-white px-4 text-center'>
            
            <div className='mb-8'>
                <Image 
                    src="/error-404.png"
                    alt="404 Illustration" 
                    width={500} 
                    height={300} 
                    priority
                    style={{ height: 'auto', width: '100%', maxWidth: '500px' }}
                    className="max-w-full"
                />
            </div>

            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                Page Not Found
            </h1>

            <p className='text-gray-400 max-w-md mb-8 leading-relaxed'>
                Sorry, the page you are looking for doesn’t exist or has been removed. Keep exploring our site.
            </p>

            <Link 
                href="/" 
                className="bg-primary hover:opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-all duration-200 flex items-center gap-2"
            >
                Back to Home <span>↗</span>
            </Link>

        </div>
    );
}