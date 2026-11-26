import { api } from "./axiosInstance";

// GET - todas las películas
export async function getMovies() {
    const { data } = await api.get("/movies");
    return data;
}

// GET - una película por id
export async function getMovieById(id) {
    const { data } = await api.get(`/movies/${id}`);
    return data;
}

// POST - crear película
export async function createMovie(movie) {
    const { data } = await api.post("/movies", movie);
    return data;
}

// PUT - actualizar película
export async function updateMovie(id, movie) {
    const { data } = await api.put(`/movies/${id}`, movie);
    return data;
}

// DELETE - borrar película
export async function deleteMovie(id) {
    const { data } = await api.delete(`/movies/${id}`);
    return data;
}