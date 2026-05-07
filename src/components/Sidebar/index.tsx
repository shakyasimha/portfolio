const links = [
    {
        section: "Getting Started", 
        items: [
            { href: "#intro", label: "Introduction" },
            { href: "#begineer", label: "Learn to Solve the Rubik's Cube" },
            { href: "#notation", label: "Notation Guide"},
        ],
    },
    {
        section: "Cubes",
        items: [
            { href: "#2x2", label: "2x2"},
            { href: "#3x3", label: "3x3"},
            { href: "#4x4", label: "4x4"},
            { href: "#5x5", label: "5x5" },
        ],
    },
    { 
        section: "Others", 
        items: [
            { href: "#my-journey", label: "My Cubing Journey" },
        ]
    }
]

export default function Sidebar({ active, setActive }: { active: string, setActive: (href: string) => void }) {
    return (
        <aside className="w-56 shrink-0 sticky top-16 h-screen overflow-y-auto py-6 sidebar-scrollbar">
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
                                    ? "text-gray-900 font-medium border-2 rounded-md border-gray-900 bg-white"
                                    : "text-gray-500 hover:text-gray-900 rounded-md hover:bg-white"
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