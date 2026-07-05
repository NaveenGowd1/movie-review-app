import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/MovieService";
import { addReview } from "../services/MovieService";

function MovieDetails() {
    const { id } = useParams();

    const [reviewData, setReviewData] = useState({
        rating: "",
        review_description: "",
    });

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovie();
    }, []);

    const fetchMovie = async () => {
        try {
            const data = await getMovieDetails(id);
            setMovie(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
    setReviewData({
        ...reviewData,
        [e.target.name]: e.target.value,
    });
};

const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
        await addReview(id, reviewData);

        alert("Review Added Successfully");

        fetchMovie();

        setReviewData({
            rating: "",
            review_description: "",
        });

    } catch (error) {
    console.log(error.response);
    console.log(error.response?.data);

    alert(
        // JSON.stringify(error.response?.data) ||
        "Unable to submit review."
    );
}
};

    if (!movie) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    return (
        <div className="container mt-5">

            <h1>{movie.title}</h1>

            <h3>⭐ {movie.avg_rating}</h3>

            <p>
                <strong>Reviews:</strong> {movie.number_rating}
            </p>

            <p>
                <strong>Release Date:</strong> {movie.release_date}
            </p>

            <hr />

            <h3>Storyline</h3>

            <p>{movie.storyline}</p>
            <hr />

            <h3>Available On</h3>

            <div className="d-flex gap-2 mb-4">
                {movie.platforms.map((platform) => (
                    <span
                        key={platform.id}
                        className="badge bg-primary fs-6"
                    >
                        {platform.name}
                    </span>
                ))}
            </div>

            <hr />

<h3>Add Review</h3>

<form onSubmit={handleReviewSubmit}>

    <div className="mb-3">

        <label className="form-label">
            Rating
        </label>

        <select
            className="form-select"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
        >
            <option value="">Select Rating</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐⭐</option>
            <option value="3">3 ⭐⭐⭐</option>
            <option value="4">4 ⭐⭐⭐⭐</option>
            <option value="5">5 ⭐⭐⭐⭐⭐</option>
        </select>

    </div>

    <div className="mb-3">

        <label className="form-label">
            Review
        </label>

        <textarea
            className="form-control"
            rows="4"
            name="review_description"
            value={reviewData.review_description}
            onChange={handleChange}
        />

    </div>

    <button className="btn btn-success">
        Submit Review
    </button>

</form>

            <h3>Reviews</h3>

            {
                movie.reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    movie.reviews.map((review) => (
                        <div
                            key={review.id}
                            className="card mb-3 shadow-sm"
                        >
                            <div className="card-body">
                                <h5>
                                    {review.review_user}
                                </h5>

                                <p>
                                    ⭐ {review.rating}
                                </p>

                                <p>
                                    {review.review_description}
                                </p>
                            </div>
                        </div>
                    ))
                )
            }

        </div>
    );
}

export default MovieDetails;