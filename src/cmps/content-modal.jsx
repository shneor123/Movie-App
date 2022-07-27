import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../cmps/carousel';
import { img_500, unavailable, unavailableLandscape ,API_KEY, img_300} from ".././config/config"

import { makeStyles } from "@material-ui/core/styles";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { Button } from '@material-ui/core';
import { YouTube } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        width: '90%',
        height: '80%',
        backgroundColor: '#39445a',
        border: '1px solid #282c34',
        borderRadius: 10,
        color: '#ffffff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}))

export default function ContentModal({ children, media_type, id }) {
    const classes = useStyles()

    const [open, setOpen] = useState(false);
    const [content, setContet] = useState()
    const [video, setVideo] = useState()

    useEffect(() => {
        fetchData()
        fetchVidio()
    }, [])


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const linkVideo = () => {
        return (
            <iframe className='videioLink'
             src={`https://www.youtube.com/embed/${video}`} 
             title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

        )
    }

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
        )
        setContet(data)
    }

    const fetchVidio = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
        )
        setVideo(data.results[0]?.key)
    }


    return (
        <>
            <div type='button' onClick={handleOpen} className="media">
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className="contentModal">

                                <img
                                    className="contentModal__portrait"
                                    alt={content.name || content.title}
                                    src={
                                        content.poster_path
                                            ? `${img_500}/${content.poster_path}`
                                            : unavailable}
                                />
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className="contentModal__landscape"
                                />

                                <div className="contentModal__about">
                                    <span className="contentModal__title">
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "- - - - - "
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}
                                    <span className="contentModal__description">
                                        {content.overview}
                                    </span>
                                    <div>
                                        <Carousel media_type={media_type} id={id} />
                                    </div>

                                    <Button
                                        variant='contained'
                                        startIcon={<YouTube />}
                                        color="secondary"
                                        target="__blank"
                                        href={`http://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch The Trailer
                                        {linkVideo()}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}




