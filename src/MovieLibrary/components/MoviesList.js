import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MovieDetailsModal from './MovieDetailsModal';
import TMDBImage from './TMDBImage';
import './MoviesList.css';
import sortMovies from '../utils/sortMovies';


export default class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  state = {
    selectedMovie: null,
    sortingOrder: '',
  }

  handleSelectMovie = item => this.setState({selectedMovie: item});

  handleSortingChange = sortingOrder => this.setState({sortingOrder});

  handleDetailsClose = () => this.setState({ selectedMovie: null });


  render() {

    const {movies} = this.props;
    const {selectedMovie, sortingOrder} = this.state;
    console.log(sortMovies(movies, sortingOrder));

    return (
      <div className="movies-list">
        <div className="movies-list__sorting">
          <span>Sort by: </span>
          <SortingOptions onChange={this.handleSortingChange}/>
        </div>

        <div className="movies-list__items">
          {
            sortMovies(movies, sortingOrder).map(movie =>
              <MovieListItem key={movie.id} movie={movie} onSelect={this.handleSelectMovie}/>
            )
          }
        </div>

        {
          selectedMovie && (
            <MovieDetailsModal
              movie={selectedMovie}
              onClose={ this.handleDetailsClose }
            />
          )
        }
      </div>
    )
  }
}

class MovieListItem extends Component {

  handleClick = () => {
    const {movie, onSelect} = this.props
    onSelect(movie)
  }

  render() {
    const {movie: {title, vote_average, poster_path}} = this.props
    return (
      <div className={classNames('movie-list-item-wrapper')}  onClick={this.handleClick}>
        <div className="movie-list-item">
          <TMDBImage src={poster_path} alt={title} className="movie-list-item__image"/>

          <div className="movie-list-item__description">
            <h3 className="movie-list-item__title">
              {title}
              <span className="movie-list-item__vote">{vote_average}</span>
            </h3>
          </div>
        </div>
      </div>
    )
  }
}

class SortingOptions extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    const selectedValue = e.target.value
    const {onChange} = this.props
    this.setState({value: selectedValue})
    onChange(selectedValue)
  }

  render() {

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value=""></option>
        <option value="name_asc">A -> Z</option>
        <option value="name_desc">Z -> A</option>
        <option value="rating">Rating</option>
      </select>
    )
  }
}
