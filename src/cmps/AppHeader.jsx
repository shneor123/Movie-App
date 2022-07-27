import React from 'react'

const AppHeader = () => {
    return (
        <span onClick={() => window.scroll(0, 0)} className="header">
            <img src="https://static.sratim.tv/assets/images/slider-1.jpg" alt="Entertainment Hub 🎬" />
        </span>
    )
}

export default AppHeader