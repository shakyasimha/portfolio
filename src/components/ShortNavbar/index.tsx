import DarkModeButton from "@/components/DarkModeButton";

export default function ShortNavbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-white/95 px-8 py-4 shadow-sm backdrop-blur-md dark:bg-slate-900/95">
            {/* Logo */}
            <div className="text-2xl font-bold">
                Sushovan's Cubing Archive
            </div>
 
            <div className="flex items-center gap-8 mx-8">
                {/* Nav Links */}
                <ul className="flex gap-4">
                    <li> Home </li>
                    <li> Timer </li>
                    <li> Blogs </li>
                </ul>

                {/* Dark Mode Button */}
                <DarkModeButton />
            </div>
        </nav>
    )
}