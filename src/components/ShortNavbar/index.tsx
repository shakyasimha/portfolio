// Navbar/index.tsx

"use client";

import DarkModeButton from "@/components/DarkModeButton";
import Dropdown from "@/components/Dropdown";

export default function ShortNavbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-20 h-16 bg-white/95 shadow-sm backdrop-blur-md dark:bg-slate-900/95">
            <div className="relative flex h-full items-center">

                {/* Mobile dark mode button (left) */}
                <div className="absolute left-4 flex items-center md:hidden">
                    <DarkModeButton />
                </div>

                {/* Title */}
                <div className="
                    absolute left-1/2 -translate-x-1/2
                    md:static md:translate-x-0
                    md:ml-8
                    text-center text-lg md:text-2xl font-bold
                ">
                    Sushovan's Cubing Archive
                </div>

                {/* Desktop dark mode button (right) */}
                <div className="hidden md:flex ml-auto mr-8 items-center">
                    <DarkModeButton />
                </div>

                {/* Mobile dropdown (right) */}
                <div className="absolute right-4 flex items-center md:hidden">
                    <Dropdown />
                </div>

            </div>
        </nav>
    );
}