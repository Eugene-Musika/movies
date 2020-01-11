import './styles.css';

import React, { Component } from 'react';

import TMDBImage from '../TMDBImage';

export default class MovieListItem extends Component {

	handleClick = () => {
		const { movie, onSelect } = this.props;

		onSelect(movie);
	}

	render () {
		/* eslint-disable camelcase */
		const { movie: { title, vote_average, poster_path } = {} } = this.props;


		return (
      <div className={ 'movie-list-item-wrapper' }  onClick={ this.handleClick }>
        <div className="movie-list-item">
          <TMDBImage src={ poster_path } alt={ title } className="movie-list-item__image" />

          <div className="movie-list-item__description">
            <h3 className="movie-list-item__title">
              { title }
              <span className="movie-list-item__vote">{ vote_average }</span>
            </h3>
          </div>
        </div>
      </div>
		);
		/* eslint-enable camelcase */
	}
}
