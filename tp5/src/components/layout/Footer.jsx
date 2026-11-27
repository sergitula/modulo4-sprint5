

const Footer = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/movies`;
    return (
        <footer>
            <div>
                <div>
                    <span>NODOCINE</span>
                </div>

                <p>
                    Catálogo CRUD desarrollado con{" "}
                    <a href="https://mockapi.io/" target="_blank" rel="noreferrer">
                        MockAPI
                    </a>
                    . © 2026 · Nodo Tecnológico · Tula Sergio Ruben
                </p>

                <nav>
                    <a href={apiUrl} target="_blank" rel="noreferrer">
                        API
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer