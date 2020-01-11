import { FETCH_MOVIES, FETCH_MOVIES_SUCCESS } from '../../actionTypes';

export function fetchNowPlayingMovies (pages = [1, 2, 3]) {
	return dispatch => {

		dispatch({ type: FETCH_MOVIES });

		Promise.all(pages.map(page =>
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=${ page }`)
	.then(res => res.json())
    ))
			.then(moviesPerPage =>
        moviesPerPage.reduce((movies, pageMovies) =>
          movies.concat(pageMovies.results)
        , [])
      )
			.then(movies => dispatch({
				type: FETCH_MOVIES_SUCCESS,
				payload: {
					movies,
					lastFetchedPage: pages[pages.length - 1],
				},
			}));

	};
}
