import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getMovieById, updateMovie } from "../../services/moviesApi";

export const MovieEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const cargarPelicula = async () => {
            try {
                const data = await getMovieById(id);
                reset({
                    title: data.title,
                    description: data.description,
                    poster: data.poster,
                    genre: data.genre,
                    year: data.year,
                    ageRating: data.ageRating,
                });
            } catch (err) {
                console.error(err);
                toast.error("No pudimos cargar la película");
                navigate("/movies");
            } finally {
                setLoading(false);
            }
        };

        cargarPelicula();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        try {
            await updateMovie(id, data);
            toast.success("Película actualizada");
            navigate(`/movies/${id}`);
        } catch (err) {
            console.error(err);
            toast.error("No se pudo actualizar la película");
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <section>
            <h1>Editar película</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mt-4">
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        {...register("title", { required: "El título es obligatorio" })}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="description">Sinopsis</label>
                    <textarea
                        id="description"
                        {...register("description", { required: "La sinopsis es obligatoria" })}
                    />
                    {errors.description && <p>{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="poster">URL del póster</label>
                    <input
                        id="poster"
                        {...register("poster", {
                            required: "La URL del póster es obligatoria",
                            pattern: {
                                value: /^https?:\/\/.+/,
                                message: "Debe ser una URL válida (http:// o https://)",
                            },
                        })}
                    />
                    {errors.poster && <p>{errors.poster.message}</p>}
                </div>

                <div>
                    <label htmlFor="genre">Género</label>
                    <input
                        id="genre"
                        {...register("genre", { required: "El género es obligatorio" })}
                    />
                    {errors.genre && <p>{errors.genre.message}</p>}
                </div>

                <div>
                    <label htmlFor="year">Año</label>
                    <input
                        id="year"
                        type="number"
                        {...register("year", {
                            required: "El año es obligatorio",
                            valueAsNumber: true,
                            min: { value: 1888, message: "Año inválido" },
                            max: { value: 2030, message: "Año inválido" },
                        })}
                    />
                    {errors.year && <p>{errors.year.message}</p>}
                </div>

                <div>
                    <label htmlFor="ageRating">Clasificación</label>
                    <select
                        id="ageRating"
                        {...register("ageRating", { required: "Seleccioná una clasificación" })}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="ATP">ATP</option>
                        <option value="+13">+13</option>
                        <option value="+18">+18</option>
                    </select>
                    {errors.ageRating && <p>{errors.ageRating.message}</p>}
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <button type="button" onClick={() => navigate(`/movies/${id}`)}>
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    )
}
