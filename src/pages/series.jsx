import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../cmps/custom-pagination'
import Genres from '../cmps/genres'
import SingleContent from '../cmps/single-content'
import { API_KEY } from '../config/config'
import useGenres from '../hooks/use-genres'


const Series = () => {
  const [content, setContet] = useState([])
  const [pages, setPages] = useState()
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres, setSlectedGenres] = useState([])
  const [genres, setGenres] = useState([])
  const geneforURL = useGenres(selectedGenres)

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page${pages}&with_genres=${geneforURL}`

    )
    setContet(data.results)
    setNumOfPages(data.total_pages)

  }

  useEffect(() => {
    fetchMovies()
  }, [pages, geneforURL])



  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSlectedGenres={setSlectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPages={setPages}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='tv'
              vote_average={c.vote_average}
            />
          ))}

      </div>
      {numOfPages > 1 && (
        <CustomPagination setPages={setPages} numOfPages={numOfPages} />
      )}

    </div>
  )
}

export default Series