import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMovies } from "../../services/moviesApi"

const ratingBadgeClasses = {
    ATP: "border-atp-border bg-atp-bg/95 text-atp-text",
    "+13": "border-r13-border bg-r13-bg/95 text-r13-text",
    "+18": "border-r18-border bg-r18-bg/95 text-r18-text",
};

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
            <div className="flex justify-center items-center py-24">
                <p className="text-on-surface-muted text-base sm:text-lg animate-pulse">Cargando películas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-5 gap-4 text-center rounded-xl border border-on-surface/10 bg-surface max-w-md mx-auto">
                <p className="text-error-text text-base sm:text-lg font-medium">{error}</p>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center rounded-lg border border-on-surface/15 bg-surface-high px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors duration-150 hover:border-on-surface/30 hover:bg-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                    Reintentar
                </button>
            </div>
        );
    }


    return (
        <section className="w-full">
            {/* Parte superior */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-on-surface/10">
                <h1 className="font-display text-[28px] leading-[34px] tracking-[-0.5px] sm:text-4xl lg:text-[40px] lg:leading-[46px] lg:tracking-[-0.8px] font-bold text-on-surface text-balance">
                    Catálogo
                </h1>
                <button
                    type="button"
                    onClick={() => navigate("/movies/create")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer w-full sm:w-auto"
                >
                    [+] Agregar película
                </button>
            </div>
            {/* Tarjetas */}

            {movies.length === 0 ? (
                <p className="text-center text-on-surface-muted py-16 px-4 rounded-xl border border-on-surface/10 bg-surface text-sm sm:text-base">
                    No hay películas cargadas todavía. ¡Agregá la primera!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
                    {movies.map((movie) => (
                        <article
                            key={movie.id}
                            onClick={() => navigate(`/movies/${movie.id}`)} // --> muestro el detalle
                            className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-on-surface/10 bg-surface transition-all duration-250 ease-out hover:-translate-y-1 hover:border-on-surface/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                        >
                            {/* Badge flotante para el rating de edad  */}
                            <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-high">
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-250 ease-out group-hover:scale-105"
                                />
                                <span
                                    className={`absolute top-2.5 right-2.5 inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold backdrop-blur-sm ${
                                        ratingBadgeClasses[movie.ageRating] ||
                                        "border-outline bg-surface-high/90 text-on-surface"
                                    }`}
                                >
                                    {movie.ageRating}
                                </span>
                            </div>

                            <div className="p-4 flex flex-col flex-1 justify-between gap-1.5">
                                <h2 className="text-base sm:text-lg font-semibold leading-snug text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                                    {movie.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-on-surface-muted tabular-nums">
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
