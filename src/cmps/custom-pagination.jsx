import React from 'react'
import { createTheme } from "@material-ui/core"

import { Pagination, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
})

const CustomPagination = ({ setPage, numOfPages = 10 }) => {

  const handelPageChange = (page) => {
    const numOfPages = 10
    setPage(page)
    window.scroll(0, 0)
  }
  return (
    <div
      style={{
        whide: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
      }}>
      <ThemeProvider theme={darkTheme}>
        <Pagination count={numOfPages}
          onChange={(e) => handelPageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color='primary'
        />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination