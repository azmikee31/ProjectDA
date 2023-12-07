import Axios from "./Axios";

//------------ PUBLIC APIs ------------

//get all movies Function5
export const getAllMoviesService = async (
    {
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
    }
) => {
    const { data } = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
    );
    return data;
};
// get random movies Function
export const getRandomMoviesService = async () => {
    const { data } = await Axios.get(`/movies/random/all`);
    return data;
}
export const getTopRatedMoviesService = async () => {
    const { data } = await Axios.get(`/movies/rated/top`);
    return data;
}
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
}

// REVIEW MOVIE FUNCTION
export const reviewMovieService = async (token, id, review) => {
    const { data } = await Axios.post(`/movie/${id}/review`, review, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}
