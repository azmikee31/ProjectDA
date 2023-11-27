import * as moviesConstants from "../Constants/MoviesConstants";
import * as moviesApi from "../APIs/MoviesServices";
import { ErrorsAction } from "../Protection";
// get all movies action 
export const getAllMoviesAction =
    ({
        category = "",
        time = "",
        language = "",
        rate = "",
        year = "",
        search = "",
        pageNumber = "",
    }
    ) =>
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