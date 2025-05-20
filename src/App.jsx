import Movies from './Movies'
import Banner from './Banner'
import Layout from './Layout'
import Movie from './Movie'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Movies />} />
                <Route path="/movie/:id" element={<Movie />} />
            </Route> 
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App