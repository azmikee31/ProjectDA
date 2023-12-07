import React from 'react';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Movie';
import Loader from '../Notifications/Loader'
import { Empty } from '../Notifications/Empty'


function PopularMovies({ movies, isLoading }) {
  const sameClass = "w-full flex-col xl:h-96 bg-dry lg:h-64 h-48"
  return (
    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill} />
      {isLoading ? (<div className={sameClass}><Loader /></div>) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={`mt-6`}>
          <Empty message="It seem's like we don't have any movies" />
        </div>
      )}

    </div>
  );
}

export default PopularMovies;
