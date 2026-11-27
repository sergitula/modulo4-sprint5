

const Footer = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/movies`;
    return (
        <footer className="border-t border-on-surface/10 bg-surface-low">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="shrink-0">
                    <span className="font-display text-lg font-semibold tracking-tight text-on-surface">
                        NODOCINE
                    </span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-muted text-center leading-relaxed">
                    Catálogo CRUD desarrollado con{" "}
                    <a
                        href="https://mockapi.io/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-on-surface hover:text-primary underline underline-offset-4 decoration-on-surface/30 hover:decoration-primary transition-colors duration-150"
                    >
                        MockAPI
                    </a>
                    . © 2026 · Nodo Tecnológico · Tula Sergio Ruben
                </p>

                <nav className="shrink-0">
                    <a
                        href={apiUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-sm font-semibold text-on-surface-muted hover:text-primary transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        API
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer