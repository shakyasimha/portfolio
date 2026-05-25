"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
// 
interface DropdownLinkItem {
    href: string;
    label: string;
}
interface DropdownSection {
    section: string;
    items: DropdownLinkItem[];
}

export default function Dropdown({ links = [] }: { links?: DropdownSection[] }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("#intro");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const panel = (
        <div className={`
            fixed inset-x-0 top-16 z-50 md:hidden
            bg-white dark:bg-slate-900
            border-b border-gray-200 dark:border-slate-700
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${open ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"}
        `}>
            <div className="overflow-y-auto max-h-[calc(100vh-4rem)] py-4">
                {links.map(({ section, items }) => (
                    <div key={section} className="mb-4">
                        <p className="px-4 mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                            {section}
                        </p>
                        <ul className="list-none m-0 p-0">
                            {items.map(({ href, label }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        onClick={() => { setActive(href); setOpen(false); }}
                                        className={`block px-4 py-2 text-sm transition-colors
                                            ${active === href
                                            ? "text-gray-900 dark:text-white font-medium border-2 rounded-md border-gray-900 dark:border-slate-500 bg-gray-100 dark:bg-slate-700"
                                            : "text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-slate-200 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
                                            }`}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden flex flex-col justify-center gap-1.5 w-6"
                aria-label="Toggle menu"
            >
                <span className={`block h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            {mounted && createPortal(panel, document.body)}
        </>
    );
}