"use client";

import { useState } from "react";
import DarkModeButton from "@/components/DarkModeButton";
import Dropdown from "@/components/Dropdown";

export default function ShortNavbar() {

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-white/95 px-8 py-4 shadow-sm backdrop-blur-md dark:bg-slate-900/95">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    Sushovan's Cubing Archive
                </div>
    
                <div className="flex items-center gap-8 md:mx-8">
                    {/* Dark Mode Button */}
                    <DarkModeButton />

                    {/* Dropdown menu */}
                    <Dropdown />
                </div>
            </nav>

        </>
    );
}