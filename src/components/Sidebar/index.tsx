import { links } from "@/data/sidebar";

export default function Sidebar({ active, setActive }: { active: string, setActive: (href: string) => void }) {
    return (
        <aside className="hidden md:block w-56 shrink-0 sticky top-16 h-screen overflow-y-auto py-6 sidebar-scrollbar">
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
                                onClick={() => setActive(href)}
                                className={`block px-4 py-1.5 text-sm transition-colors
                                    ${active === href
                                    ? "text-gray-900 dark:text-slate-900 font-medium border-2 rounded-md border-gray-900 dark:border-slate-500 bg-gray-100 dark:bg-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-900 rounded-md hover:bg-gray-100 dark:hover:bg-white"
                                }`}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                </div>
            ))}
        </aside>
    )
}