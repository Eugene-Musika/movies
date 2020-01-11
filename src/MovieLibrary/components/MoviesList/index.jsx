import './styles.css';

import React, { PureComponent } from 'react';

import MovieDetailsModal from '../MovieDetailsModal';
import MovieListItem from '../MoviesListitem';
import PropTypes from 'prop-types';
import SortingOptions from '../SortingOptions';
import sortMovies from '../../utils/sortMovies';

export default class MoviesList extends PureComponent {
	static propTypes = { movies: PropTypes.array.isRequired }

	state = {
		selectedMovie: null,
		sortingOrder: '',
	}

	handleSelectMovie = item => this.setState({ selectedMovie: item });

	handleSortingChange = sortingOrder => this.setState({ sortingOrder });

	handleDetailsClose = () => this.setState({ selectedMovie: null });


	render () {
		const { movies } = this.props;
		const { selectedMovie, sortingOrder } = this.state;

		return (
      <div className="movies-list">
        <div className="movies-list__sorting">
          <span>Sort by: </span>
          <SortingOptions onChange={ this.handleSortingChange } />
        </div>

        <div className="movies-list__items">
          {
            sortMovies(movies, sortingOrder).map(movie =>
              movie &&
                <MovieListItem key={ movie.id } movie={ movie } onSelect={ this.handleSelectMovie } />
              ||
                <span style={ { color: 'red' } }>Error!</span>
            )
          }
        </div>

        {
          selectedMovie && (
            <MovieDetailsModal
              movie={ selectedMovie }
              onClose={ this.handleDetailsClose }
            />
          )
        }
      </div>
		);
	}
}
