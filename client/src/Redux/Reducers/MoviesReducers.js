import * as moviesConstants from '../Constants/MoviesConstants';

//Get all movies
export const moviesListReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_LIST_REQUEST:
            return { isLoading: true, };
        case moviesConstants.MOVIES_LIST_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload.movies,
                pages: action.payload.pages,
                page: action.payload.page,
                totalMovies: action.payload.totalMovies
            };
        case moviesConstants.MOVIES_LIST_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
};

export const moviesRandomReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_RANDOM_REQUEST:
            return { isLoading: true, };
        case moviesConstants.MOVIES_RANDOM_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload,
            };
        case moviesConstants.MOVIES_RANDOM_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
};

export const moviesDetailReducer = (state = { movies: {} }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_DETAIL_REQUEST:
            return { isLoading: true, };
        case moviesConstants.MOVIES_DETAIL_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload,
            };
        case moviesConstants.MOVIES_DETAIL_FAIL:
            return { isLoading: false, isError: action.payload };
        case moviesConstants.MOVIES_DETAIL_RESET:
            return { movies: {} };
        default:
            return state;
    }
};

export const moviesTopRatedReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_TOP_RATED_REQUEST:
            return { isLoading: true, };
        case moviesConstants.MOVIES_TOP_RATED_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload,
            };
        case moviesConstants.MOVIES_TOP_RATED_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
};

export const createReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.CREATE_REVIEW_REQUEST:
            return { isLoading: true, };
        case moviesConstants.CREATE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case moviesConstants.CREATE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload };
        case moviesConstants.CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};