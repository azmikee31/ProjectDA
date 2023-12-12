import React, { useEffect } from 'react';
import Banner from '../Components/Home/Banner';
import PopularMovies from '../Components/Home/PopularMovies';
import Promos from '../Components/Home/Promos';
import TopRated from '../Components/Home/TopRated';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction, getMoviesRandomAction, getMoviesTopRatedAction } from '../Redux/Actions/moviesActions';
import { toast } from 'react-toastify'

function HomeScreen() {
  const dispatch = useDispatch();
  const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector(state => state.getMoviesRandom);
  const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(state => state.getMoviesTopRated);
  const { isLoading, isError, movies } = useSelector(state => state.getAllMovies);
  useEffect(() => {
    dispatch(getMoviesRandomAction())
    dispatch(getAllMoviesAction({}))
    dispatch(getMoviesTopRatedAction())

    if (isError || randomError || topError) {
      toast.error("Something went wrong!!")
    }
  }, [dispatch, isError, randomError, topError])
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
