"use client";

import { useState } from "react";
import DarkModeButton from "@/components/DarkModeButton";
import Dropdown from "@/components/Dropdown";

export default function ShortNavbar() {

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-20 h-16 bg-white/95 shadow-sm backdrop-blur-md dark:bg-slate-900/95">
                <div className="relative flex h-full items-center justify-center px-4 md:px-8">

                    {/* Left side */}
                    <div className="absolute left-4 md:left-8 flex items-center">
                        <DarkModeButton />
                    </div>

                    {/* Center title */}
                    <div className="text-center text-lg md:text-2xl font-bold">
                        Sushovan's Cubing Archive
                    </div>

                    {/* Right side */}
                    <div className="absolute right-4 md:right-8 flex items-center">
                        <Dropdown />
                    </div>

                </div>
            </nav>
        </>
    );
}