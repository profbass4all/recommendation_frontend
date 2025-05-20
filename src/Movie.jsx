import { useParams, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
function Movie() {
    const { id } = useParams();
    const { movies } = useOutletContext()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
    
        const foundMovie = movies?.find(
            (show, index) => index === parseInt(id, 10)
        );
        setMovie(foundMovie);
        if (foundMovie) {
            fetchRecommendations(foundMovie.Title)
        } else {
        setLoading(false);
        setError("Movie not found.");
        }
    }, [])
    // console.log(movie)
    // console.log(recommendations)
    const fetchRecommendations = async (movieTitle) => {
        try {
            setLoading(true)
            setError(null)

        
        const encodedMovieTitle = encodeURIComponent(movieTitle);
        const apiUrl = `https://recommendation-backend-heyq.onrender.com/recommend?title=${encodedMovieTitle}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          const errorBody = await response.text()
          throw new Error(
            `Failed to fetch recommendations: ${response.status} ${response.statusText} - ${errorBody}`
          );
        }

        const data = await response.json(); //
        setRecommendations(data.data)
      } catch (err) {
        setError(err.message)
        setRecommendations([])
      } finally {
        setLoading(false)
      }
    }
    
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
    if(!movie){
        return (
            <div className='flex justify-center items-center h-screen'>
                <h2 className='text-red-400 text-2xl '>Movie not found</h2>
            </div>
        )
    }

    const recommendationsList = recommendations?.map((movie, index) => {
        return (
          <div
            key={index}
            className="w-sm pb-4 grow md:min-h-96 ml-2 md:max-h-120 overflow-y-auto "
          >
            <div className="bg-green-200 rounded-t-2xl h-40 shadow-md"></div>
            <div className="p-4 bg-green-900 rounded-b-2xl md:h-75 shadow-md">
              <h2 className="text-gray-100 font-bold text-lg">
                Title:{" "}
                <span className="text-green-200 text-sm">
                  {movie.Series_Title}
                </span>
              </h2>
              <p className="text-gray-100 font-bold text-lg">
                Overview:{" "}
                <span className="text-green-200 text-sm">{movie.Overview}</span>
              </p>
              <p className="text-gray-100 font-bold text-lg">
                Genre: <span className="text-green-200 text-sm">{movie.Genre}</span>
              </p>
              <p className="text-gray-100 font-bold text-lg">
                Year:
                <span className="text-green-200 text-sm">
                  {movie.Released_Year}
                </span>
              </p>
              <p className="text-gray-100 font-bold text-lg">
                Rating:
                <span className="text-green-200 text-sm">
                  {movie.IMDB_Rating}</span>
              </p>

              <p className="text-gray-100 font-bold text-lg">
                Director:
                <span className="text-green-200 text-sm">{movie.Director}</span>
              </p>
            </div>
          </div>
        );
    })
  return (
    <>
      <div className="flex justify-center items-center h-screen">
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
            Year:{" "}
            <span className="text-green-200 text-sm">
              {movie.Released_Year}
            </span>
          </p>
          <p className="text-gray-100 font-bold text-lg">
            Rating:{" "}
            <span className="text-green-200 text-sm">{movie.IMDB_Rating} </span>
          </p>

          <p className="text-gray-100 font-bold text-lg">
            Director:{" "}
            <span className="text-green-200 text-sm">{movie.Director}</span>
          </p>
          <p className="text-gray-100 font-bold text-lg">
            Actors:{" "}
            <span className="text-green-200 text-sm">{movie.Stars}</span>
          </p>
          <p className="text-gray-100 font-bold text-lg">
            Duration:{" "}
            <span className="text-green-200 text-sm">{movie.Runtime}</span>
          </p>
        </div>
      </div>
        <h2 className="text-green-400 text-6xl mx-6 text-center font-bold mb-16">
            Recommendations
        </h2>
        <div className="flex flex-wrap justify-center items-center mx-6">
            {recommendationsList.length === 0 ? (
                <h2 className="text-red-400 text-2xl">No recommendations found</h2>
            ) : (
                recommendationsList
            )}
        </div>
            
    </>
  );
}

export default Movie