import { FETCH_MOVIES, FETCH_MOVIES_SUCCESS } from '../../actionTypes';

const initialState = {
	movies: [],
	pending: true,
	lastFetchedPage: 0,
	finished: false,
};

export default function movies (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_MOVIES:
			return {
				...state,
				pending: true,
			};

		case FETCH_MOVIES_SUCCESS:
			return {
				...state,
				movies: [
					...state.movies,
					...payload.movies,
				],
				pending: false,
				lastFetchedPage: payload.lastFetchedPage,
				finished: payload.movies.length === 0,
			};

		default:
			return state;
	}
}
