import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMovies } from "../../services/moviesApi"

export const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                const data = await getMovies();
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError("No pudimos cargar el catálogo de películas.");
            } finally {
                setLoading(false);
            }
        };
        cargarPeliculas();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-neutral-400 text-lg">Cargando películas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <p className="text-red-400 text-lg">{error}</p>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
                >
                    Reintentar
                </button>
            </div>
        );
    }


    return (
        <section>
            {/* Parte superior */}
            <div>
                <h1>Catálogo</h1>
                <button
                    type="button"
                    onClick={() => navigate("/movies/create")}

                >
                    [+] Agregar película
                </button>
            </div>
            {/* Tarjetas */}

            {movies.length === 0 ? (
                <p className="text-center text-neutral-400 py-16">
                    No hay películas cargadas todavía. ¡Agregá la primera!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <article
                            key={movie.id}
                            onClick={() => navigate(`/movies/${movie.id}`)} // --> muestro el detalle
                            className="group bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col"
                        >
                            {/* Badge flotante para el rating de edad  */}
                            <div className="relative ">
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 right-2 bg-black/80 text-xs font-semibold px-2 py-1 rounded border ">
                                    {movie.ageRating}
                                </span>
                            </div>

                            <div className="p-4 flex flex-col flex-1">
                                <h2 className="text-lg font-semibold ">
                                    {movie.title}
                                </h2>
                                <p className="text-xs text-neutral-400 mt-1">
                                    {movie.genre} • {movie.year}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}



        </section>
    )
}
