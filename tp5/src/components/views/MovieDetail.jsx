import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { deleteMovie, getMovieById } from "../../services/moviesApi";
import ConfirmModal from "../ui/ConfirmModal";

const ratingBadgeClasses = {
    ATP: "border-atp-border bg-atp-bg text-atp-text",
    "+13": "border-r13-border bg-r13-bg text-r13-text",
    "+18": "border-r18-border bg-r18-bg text-r18-text",
};

export const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const cargarPelicula = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError("Película no encontrada.");
            } finally {
                setLoading(false);
            }
        };

        cargarPelicula();
    }, [id]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteMovie(id);
            toast.success("Película eliminada");
            navigate("/movies");
        } catch (err) {
            console.error(err);
            toast.error("No se pudo eliminar la película");
        } finally {
            setDeleting(false);
            setShowModal(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <p className="text-on-surface-muted text-base sm:text-lg animate-pulse">Cargando película...</p>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-5 gap-4 text-center rounded-xl border border-on-surface/10 bg-surface max-w-md mx-auto">
                <p className="text-error-text text-base sm:text-lg font-medium">
                    {error || "No se encontró la película."}
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/movies")}
                    className="inline-flex items-center justify-center rounded-lg border border-on-surface/15 bg-surface-high px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors duration-150 hover:border-on-surface/30 hover:bg-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                    Volver al catálogo
                </button>
            </div>
        );
    }


    return (
        <section className="relative w-full">
            {/* Imagen de portada translúcida de fondo */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-8 sm:-top-12 -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 w-screen overflow-hidden z-0"
            >
                <img
                    src={movie.poster}
                    alt=""
                    className="h-full w-full object-cover object-center opacity-35 sm:opacity-45 blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/65" />
            </div>

            <div className="relative z-10">
                <button
                    type="button"
                    onClick={() => navigate("/movies")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-on-surface/15 bg-surface/85 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-on-surface transition-colors duration-150 ease-out hover:border-on-surface/30 hover:bg-surface-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface/40 cursor-pointer mb-6 sm:mb-8"
                >
                    ← Volver
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                    <div className="md:col-span-5 lg:col-span-4 w-full max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto md:mx-0 overflow-hidden rounded-xl border border-on-surface/15 bg-surface shadow-2xl">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full aspect-[2/3] object-cover block"
                        />
                    </div>

                    <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-5 sm:gap-6 min-w-0">
                        <div className="flex flex-col gap-3 sm:gap-4 border-b border-on-surface/15 pb-5 sm:pb-6">
                            <h1 className="font-display text-[28px] leading-[34px] tracking-[-0.5px] sm:text-4xl lg:text-[40px] lg:leading-[46px] lg:tracking-[-0.8px] font-bold text-on-surface text-balance break-words">
                                {movie.title}
                            </h1>
                            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm sm:text-base text-on-surface-muted tabular-nums">
                                <span>{movie.genre}</span>
                                <span aria-hidden="true">•</span>
                                <span>{movie.year}</span>
                                <span aria-hidden="true">•</span>
                                <span
                                    className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${ratingBadgeClasses[movie.ageRating] ||
                                        "border-outline bg-surface-high text-on-surface"
                                        }`}
                                >
                                    {movie.ageRating}
                                </span>
                            </p>
                        </div>

                        <p className="text-sm sm:text-base leading-relaxed text-on-surface/90 max-w-prose text-pretty break-words">
                            {movie.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate(`/movies/${id}/edit`)}
                                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-on-surface/15 bg-surface/85 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-on-surface transition-colors duration-150 ease-out hover:border-on-surface/30 hover:bg-surface-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface/40 cursor-pointer"
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                disabled={deleting}
                                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-error/40 bg-error-bg/90 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-error-text transition-colors duration-150 ease-out hover:bg-error hover:text-white hover:border-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showModal}
                title="Eliminar película"
                confirmText="Sí, eliminar"
                loading={deleting}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDelete}
            >
                ¿Seguro que querés eliminar <strong className="text-on-surface">"{movie.title}"</strong>? Esta acción no se puede deshacer.
            </ConfirmModal>

        </section>
    )
}
