import axios from "axios"
import { useEffect, useState } from "react"
import CustomPagination from "../cmps/custom-pagination"
import SingleContent from "../cmps/single-content"
import { API_KEY } from "../config/config"

const Trending = () => {
  const [content, setContet] = useState([])
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState()

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`)
    setContet(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) =>
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          )}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} page={page} numOfPages={numOfPages} />)}
    </div>
  )
}

export default Trending