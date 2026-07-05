import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [page, setPage] = useState(1);
    const [ordering, setOrdering] = useState("");
        useEffect(() => {
    fetchMovies();
}, [page, ordering]);

const handleSearch = () => {
    setPage(1);
    fetchMovies();
};

    const fetchMovies = async () => {
    try {
        console.log("Searching:", search);

        const data = await getMovies(
    search,
    page,
    ordering
);

        console.log(data);

        if (data.results) {
            setMovies(data.results);
        } else {
            setMovies(data);
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);

    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="container mt-4">

            <div className="row mb-4">
            <div className="col-md-8">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="col-md-4">
                <button
                            className="btn btn-primary w-100"
                            onClick={() => {
                                console.log("Search button clicked");
                                handleSearch();
                            }}
                        >
                            Search
                        </button>
            </div>
            <div className="row mb-4">

    <div className="col-md-4">
        <select
            className="form-select"
            value={ordering}
            onChange={(e) => {
                setOrdering(e.target.value);
                setPage(1);
            }}
        >
            <option value="">
                Default Ordering
            </option>

            <option value="-avg_rating">
                Highest Rated
            </option>

            <option value="-number_rating">
                Most Reviewed
            </option>

            <option value="-release_date">
                Latest Release
            </option>

            <option value="release_date">
                Oldest Release
            </option>

        </select>
    </div>

</div>
        </div>
            <h1>Movies</h1>

            <div className="row">
                {movies.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie.id}>
                        <MovieCard movie={movie} />
                        
                    </div>  
                ))}
                <div className="d-flex justify-content-center gap-3 mt-4">

                            <button
                                className="btn btn-secondary"
                                disabled={!previousPage}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>

                            <span className="align-self-center">
                                Page {page}
                            </span>

                            <button
                                className="btn btn-secondary"
                                disabled={!nextPage}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
            </div>
        </div>
    );
}

export default Home;