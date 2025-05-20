import { useState, useEffect } from 'react'
import './App.css'
import { Link, useOutletContext } from 'react-router-dom'

function Movies() {
  
  const { movies, loading, error } = useOutletContext()
  

if(loading){
  return (
    <div className='flex justify-center items-center'>
      <h2 className='text-green-400 text-2xl '>Loading...</h2>
    </div>
  )
}
if(error){
  return (
    <div className='flex justify-center items-center h-screen'>
      <h2 className='text-red-400 text-2xl '>Error: {error}</h2>
    </div>
  )
}

const displayMovies = movies?.map((movie, index) => {
  return (
    <Link
      key={index}
      to={`/movie/${index}`}
      className=" w-sm pb-4 grow md:min-h-96 ml-2 md:max-h-120 overflow-y-auto "
    >
      <div className="bg-green-200 rounded-t-2xl h-40 shadow-md"></div>
      <div className="p-4 bg-green-900 rounded-b-2xl md:h-75 shadow-md">
        <h2 className="text-gray-100 font-bold text-lg">
          Title: <span className="text-green-200 text-sm">{movie.Title}</span>
        </h2>
        <p className="text-gray-100 font-bold text-lg">
          Overview:{" "}
          <span className="text-green-200 text-sm">{movie.overview}</span>
        </p>
        <p className="text-gray-100 font-bold text-lg">
          Genre: <span className="text-green-200 text-sm">{movie.Genre}</span>
        </p>
        <p className="text-gray-100 font-bold text-lg">
          Year:
          <span className="text-green-200 text-sm">{movie.Released_Year}</span>
        </p>
        <p className="text-gray-100 font-bold text-lg">
          Rating:
          <span className="text-green-200 text-sm">{movie.IMDB_Rating} </span>
        </p>

        <p className="text-gray-100 font-bold text-lg">
          Director:
          <span className="text-green-200 text-sm">{movie.Director}</span>
        </p>
      </div>
    </Link>
  );
})
  return (
    <>
      
      <h2 className="text-green-600 text-2xl md:text-4xl lg:text-6xl text-center mt-8 font-bold ">List of movies available to watch</h2>
      <div className='pt-12 flex md:flex-wrap mx-2 flex-col md:flex-row items-center'>{displayMovies}</div>
    </>
  );
}

export default Movies
