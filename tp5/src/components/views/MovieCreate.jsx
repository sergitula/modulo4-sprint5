import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createMovie } from "../../services/moviesApi";


export const MovieCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await createMovie(data);
            toast.success("Película creada");
            navigate("/movies");
        } catch (err) {
            console.error(err);
            toast.error("No se pudo crear la película");
        }
    };

    return (
        <section>
            <h1>Agregar película</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mt-4">
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        {...register("title", { required: "El título es obligatorio" })}
                        placeholder="Ej: Matrix"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="description">Sinopsis</label>
                    <textarea
                        id="description"
                        {...register("description", { required: "La sinopsis es obligatoria" })}
                        placeholder="Breve descripción..."
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
                        placeholder="https://..."
                    />
                    {errors.poster && <p>{errors.poster.message}</p>}
                </div>

                <div>
                    <label htmlFor="genre">Género</label>
                    <input
                        id="genre"
                        {...register("genre", { required: "El género es obligatorio" })}
                        placeholder="Ej: Ciencia Ficción"
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
                        placeholder="Ej: 1999"
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
                        {isSubmitting ? "Creando..." : "Crear película"}
                    </button>
                    <button type="button" onClick={() => navigate("/movies")}>
                        Volver
                    </button>
                </div>
            </form>
        </section>
    )
}
