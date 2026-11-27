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

    const inputBaseClass =
        "w-full rounded-lg border bg-surface-low px-3.5 py-2.5 text-sm text-on-surface placeholder:text-on-surface-muted/60 transition-colors duration-150 focus:outline-none focus:ring-1";
    const getInputClass = (hasError) =>
        `${inputBaseClass} ${
            hasError
                ? "border-error focus:border-error focus:ring-error"
                : "border-on-surface/15 focus:border-primary focus:ring-primary"
        }`;

    return (
        <section className="w-full max-w-2xl mx-auto rounded-xl border border-on-surface/10 bg-surface p-5 sm:p-8">
            <h1 className="font-display text-2xl sm:text-[32px] sm:leading-[38px] font-bold tracking-tight text-on-surface pb-5 sm:pb-6 mb-6 border-b border-on-surface/10">
                Agregar película
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-semibold text-on-surface">
                        Título
                    </label>
                    <input
                        id="title"
                        className={getInputClass(errors.title)}
                        {...register("title", { required: "El título es obligatorio" })}
                        placeholder="Ej: Matrix"
                    />
                    {errors.title && (
                        <p className="text-xs font-medium text-error-text mt-0.5">{errors.title.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-semibold text-on-surface">
                        Sinopsis
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className={`${getInputClass(errors.description)} min-h-[110px] resize-y`}
                        {...register("description", { required: "La sinopsis es obligatoria" })}
                        placeholder="Breve descripción..."
                    />
                    {errors.description && (
                        <p className="text-xs font-medium text-error-text mt-0.5">{errors.description.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="poster" className="text-sm font-semibold text-on-surface">
                        URL del póster
                    </label>
                    <input
                        id="poster"
                        className={getInputClass(errors.poster)}
                        {...register("poster", {
                            required: "La URL del póster es obligatoria",
                            pattern: {
                                value: /^https?:\/\/.+/,
                                message: "Debe ser una URL válida (http:// o https://)",
                            },
                        })}
                        placeholder="https://..."
                    />
                    {errors.poster && (
                        <p className="text-xs font-medium text-error-text mt-0.5">{errors.poster.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="genre" className="text-sm font-semibold text-on-surface">
                            Género
                        </label>
                        <input
                            id="genre"
                            className={getInputClass(errors.genre)}
                            {...register("genre", { required: "El género es obligatorio" })}
                            placeholder="Ej: Ciencia Ficción"
                        />
                        {errors.genre && (
                            <p className="text-xs font-medium text-error-text mt-0.5">{errors.genre.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="year" className="text-sm font-semibold text-on-surface">
                            Año
                        </label>
                        <input
                            id="year"
                            type="number"
                            className={`${getInputClass(errors.year)} tabular-nums`}
                            {...register("year", {
                                required: "El año es obligatorio",
                                valueAsNumber: true,
                                min: { value: 1888, message: "Año inválido" },
                                max: { value: 2030, message: "Año inválido" },
                            })}
                            placeholder="Ej: 1999"
                        />
                        {errors.year && (
                            <p className="text-xs font-medium text-error-text mt-0.5">{errors.year.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="ageRating" className="text-sm font-semibold text-on-surface">
                            Clasificación
                        </label>
                        <select
                            id="ageRating"
                            className={`${getInputClass(errors.ageRating)} cursor-pointer`}
                            {...register("ageRating", { required: "Seleccioná una clasificación" })}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="ATP">ATP</option>
                            <option value="+13">+13</option>
                            <option value="+18">+18</option>
                        </select>
                        {errors.ageRating && (
                            <p className="text-xs font-medium text-error-text mt-0.5">{errors.ageRating.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row-reverse sm:items-center sm:justify-start gap-3 pt-5 sm:pt-6 border-t border-on-surface/10">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
                    >
                        {isSubmitting ? "Creando..." : "Crear película"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/movies")}
                        className="inline-flex items-center justify-center rounded-lg border border-on-surface/15 bg-surface px-6 py-2.5 text-sm font-semibold text-on-surface transition-colors duration-150 ease-out hover:border-on-surface/30 hover:bg-surface-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface/40 cursor-pointer w-full sm:w-auto"
                    >
                        Volver
                    </button>
                </div>
            </form>
        </section>
    )
}
