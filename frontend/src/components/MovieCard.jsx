import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body text-center">

                <h3 className="card-title fw-bold mb-3">
                    🎬 {movie.title}
                </h3>

                <p className="text-warning fs-5">
                    ⭐ {movie.avg_rating}
                </p>

                <p className="text-secondary">
                    📝 {movie.number_rating} Reviews
                </p>

                <p className="text-muted">
                    📅 {movie.release_date}
                </p>

                <Link
                    to={`/movies/${movie.id}`}
                    className="btn btn-primary mt-3"
                >
                    View Details
                </Link>

            </div>
        </div>
    )
}

export default MovieCard