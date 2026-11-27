import { Link } from "react-router";

const Navbar = () => {
    return (
        <header className="border-b border-neutral-800">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/movies" className="text-xl font-bold">
                    Nodo Cine
                </Link>

                <div className="flex gap-4 text-sm">
                    <Link to="/movies">Catálogo</Link>
                    <Link to="/movies/create">+ Nueva película</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar