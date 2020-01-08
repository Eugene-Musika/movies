import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MovieDetailsModal from './MovieDetailsModal';
import TMDBImage from './TMDBImage';
import './MoviesList.css';


export default class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  state = {
    selectedMovie: null
  }

  handleSelectMovie = item => this.setState({selectedMovie: item});

  handleSortingChange = sortingType => console.log(sortingType);

  handleDetailsClose = () => this.setState({ selectedMovie: null });

  render() {

    const {movies} = this.props
    const {selectedMovie} = this.state

    return (
      <div className="movies-list">
        <div className="movies-list__sorting">
          <span>Sort by: </span>
          <SortingOptions onChange={this.handleSortingChange}/>
        </div>

        <div className="movies-list__items">
          {
            movies.map(movie =>
              <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={this.handleSelectMovie}/>
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
    const {movie: {title, vote_average, poster_path}, isSelected} = this.props
    return (
      <div className={classNames('movie-list-item-wrapper', {'selected': isSelected})}  onClick={this.handleClick}>
        <div className="movie-list-item">
          <TMDBImage src={poster_path} alt={title} className="movie-list-item__image"/>

          <div className="movie-list-item__description">
            <h3 class="movie-list-item__title">
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
