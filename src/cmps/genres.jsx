import { Chip } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { API_KEY } from '../config/config'

const Genres = ({
    selectedGenres,
    setSlectedGenres,
    genres,
    setGenres,
    type,
    setPages
}) => {

    useEffect(() => {
        fetchGenres()

        return () => {
            setGenres({})
        }
        
    }, [])

    const handeleAdd = (genre) => {
        setSlectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => g.id !== genre.id))
        setPages(1)
    }

    const handeleRemove = (genre) => {
        setSlectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        )
    }

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        )
        setGenres(data.genres)
    }

    return (
        <div style={{ padding: '6px 0' }}>
            {selectedGenres &&
                selectedGenres.map((genre) => (
                    <Chip
                        label={genre.name}
                        style={{ margin: 2 }}
                        size='small'
                        color='primary'
                        key={genre.id}
                        clickable
                        onDelete={()=>handeleRemove(genre)}
                    />
                ))}
            {genres &&
                genres.map((genre) => (
                    <Chip
                        label={genre.name}
                        style={{ margin: 2 }}
                        size='small'
                        key={genre.id}
                        clickable
                        onClick={() => handeleAdd(genre)}
                    />
                ))}
        </div>
    )
}

export default Genres