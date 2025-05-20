import Banner from './Banner'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from "react";

function Layout() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      async function getMovies() {
        setLoading(true);
        try {
          const response = await fetch(
            "https://recommendation-backend-heyq.onrender.com/movies",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setMovies(data.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      getMovies();
    }, []);
  return (
    <>
        <Banner />

        <Outlet context = {{movies, loading, error}}/>
        
    </>
  )
}

export default Layout