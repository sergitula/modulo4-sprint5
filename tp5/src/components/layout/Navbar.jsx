import { Link } from "react-router";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-on-surface/10 bg-background/90 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
                <Link
                    to="/movies"
                    className="inline-flex items-center gap-2 font-display text-lg sm:text-[22px] font-bold tracking-tight text-on-surface whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary before:content-[''] before:inline-block before:h-2.5 before:w-2.5 before:rounded-full before:bg-primary before:shadow-[0_0_10px_#e50914]"
                >
                    Nodo Cine
                </Link>

                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                    <Link
                        to="/movies"
                        className="text-xs sm:text-sm font-semibold text-on-surface-muted hover:text-on-surface transition-colors duration-150 whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        Catálogo
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar