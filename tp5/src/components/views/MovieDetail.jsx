import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { deleteMovie, getMovieById } from "../../services/moviesApi";

export const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

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
        const confirmar = window.confirm(
            `¿Seguro que querés eliminar "${movie.title}"?`
        );
        if (!confirmar) return;

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
        }
    };

    if (loading) return <p>Cargando película...</p>;

    if (error || !movie) {
        return (
            <div>
                <p>{error || "No se encontró la película."}</p>
                <button type="button" onClick={() => navigate("/movies")}>
                    Volver al catálogo
                </button>
            </div>
        );
    }


    return (
        <section>
            <button type="button" onClick={() => navigate("/movies")}>
                ← Volver
            </button>

            <div>
                <img src={movie.poster} alt={movie.title} className="w-60" />

                <h1>{movie.title}</h1>
                <p>
                    {movie.genre} • {movie.year} • {movie.ageRating}
                </p>
                <p>{movie.description}</p>

                <div className="flex gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/movies/${id}/edit`)}
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </div>
        </section>
    )
}
