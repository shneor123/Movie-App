import Trending from "./pages/trending";
import Movies from "./pages/movies";
import Series from "./pages/series";
import Search from "./pages/search";

export default [
    {
        path: '/',
        component: Trending
    },
    {
        path: '/movies',
        component: Movies
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/series',
        component: Series
    }
  
]
