import React, { useEffect, useState } from "react"
import axios from "axios"
import CustomPagination from "../cmps/custom-pagination"
import SingleContent from "../cmps/single-content"
import { API_KEY } from "../config/config"

import { Button, createTheme, Tabs, } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons"
import { Tab, TextField, ThemeProvider } from "@mui/material"


const Search = () => {
  const [type, setType] = useState(0)
  const [page, setPages] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [content, setContet] = useState()
  const [numOfPages, setNumOfPages] = useState()


  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ffffff"
      },
    },
  })


  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    )
    setContet(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSearch()

  }, [type, page])


  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", paddingBottom: "20px" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchOutlined />
          </Button>
        </div>

        <Tabs
        className="tabs"
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue)
            setPages(1)
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPages={setPages} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search