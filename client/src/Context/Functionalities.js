import toast from "react-hot-toast"
import { useSelector } from 'react-redux'
import { LikeMoviesAction } from "../Redux/Actions/userActions"

const IfMovieLiked = (movie) => {
    const { likedMovies } = useSelector(state => state.userGetFavoriteMovies)
    return likedMovies?.find(likedMovie => likedMovie?._id === movie._id)
}

const LikeMovie = (movie, dispatch, userInfo) => {
    return !userInfo
        ? toast.error("Please Login to to add to favorite")
        : dispatch(
            LikeMoviesAction({
                movieId: movie._id,
            })
        );
};

export { IfMovieLiked, LikeMovie }