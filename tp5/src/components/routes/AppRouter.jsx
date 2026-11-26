import { Routes, Route, Navigate } from "react-router"
import { MovieList } from "../views/MovieList"
import { MovieCreate } from "../views/MovieCreate"
import { MovieEdit } from "../views/MovieEdit"
import { MovieDetail } from "../views/MovieDetail"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/create" element={<MovieCreate />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/movies/:id/edit" element={<MovieEdit />} />
            <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
    )
}
