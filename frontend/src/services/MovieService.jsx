import api from "../api/axios";
;

export const getMovies = async (
    searchQuery = "",
    page = 1,
    ordering = ""
) => {
    const response = await api.get(
        "movies/",
        {
            params: {
                search: searchQuery,
                page: page,
                ordering: ordering,
            },
        }
    );

    return response.data;
};

export const getMovieDetails = async (id) => {
    const response = await api.get(`movies/${id}/`);
    return response.data;
};

export const addReview = async (movieId, reviewData) => {
    const token = localStorage.getItem("access");

    const response = await api.post(
        `movies/${movieId}/reviews/`,
        reviewData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};