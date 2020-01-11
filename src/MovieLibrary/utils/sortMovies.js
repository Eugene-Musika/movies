/**
 * Get sorted movies
 *
 * @param {object} movies
 * @param {'name_asc' | 'name_desc' | 'rating'} order
 */
export default function sortMovies (movies, order) {
	switch (order) {
		case 'name_asc':
			return [...movies].sort((a, b) => a.title.localeCompare(b.title));

		case 'name_desc':
			return [...movies].sort((a, b) => -a.title.localeCompare(b.title));

		case 'rating':
			return [...movies].sort((a, b) => b.vote_average - a.vote_average);
	}

	return movies;
}
