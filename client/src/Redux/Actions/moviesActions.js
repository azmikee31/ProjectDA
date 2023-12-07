import * as moviesConstants from "../Constants/MoviesConstants";
import * as moviesApi from "../APIs/MoviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import { toast } from 'react-toastify'
// get all movies action 
export const getAllMoviesAction = ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
}) =>
    async (dispatch) => {
        try {
            const response = await moviesApi.getAllMoviesService({ category, time, language, rate, year, search, pageNumber })
            dispatch({
                type: moviesConstants.MOVIES_LIST_SUCCESS, payload: response,
            })
        } catch (error) {
            ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL)
        }
    };

export const getMoviesRandomAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST })
        const response = await moviesApi.getRandomMoviesService()
        dispatch({
            type: moviesConstants.MOVIES_RANDOM_SUCCESS, payload: response,
        })
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL)
    }
};
export const getMoviesDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_DETAIL_REQUEST })
        const response = await moviesApi.getMovieByIdService(id)
        dispatch({
            type: moviesConstants.MOVIES_DETAIL_SUCCESS, payload: response,
        })
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_DETAIL_FAIL)
    }
};
export const getMoviesTopRatedAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_TOP_RATED_REQUEST })
        const response = await moviesApi.getTopRatedMoviesService()
        dispatch({
            type: moviesConstants.MOVIES_TOP_RATED_SUCCESS, payload: response,
        })
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_TOP_RATED_FAIL)
    }
};
export const reviewMovieAction = ({ id, review }) => async (dispatch, getState) => {
    try {
        dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST })
        const response = await moviesApi.reviewMovieService(
            tokenProtection(getState),
            id,
            review
        )
        dispatch({
            type: moviesConstants.CREATE_REVIEW_SUCCESS,
            payload: response,
        });
        toast.success("Review added successFully");
        dispatch({ type: moviesConstants.CREATE_REVIEW_RESET })
        dispatch(getMoviesDetailAction(id));
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL)
    }
}
