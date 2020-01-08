import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import classNames from 'classnames';

import TMDBImage from './TMDBImage';
import './MovieDetailsModal.css';


const appRoot = document.getElementById('root');

class MovieDetailsModal extends React.Component {
	modal = document.createElement('div');

	state = {
		isActive: true
	}

  componentDidMount() {
    appRoot.appendChild(this.modal);
	}

  componentWillUnmount() {
    appRoot.removeChild(this.modal);
	}

	handleCloseClick = () => {
		const { onClose = () => {} } = this.props;

		this.setState({ isActive: false });
		setTimeout(onClose, 300); // because closing css animation time is 300ms
	}

  render() {
		const {movie: {
			title,
			original_title,
			poster_path,
			overview,
			vote_average,
			vote_count,
		}} = this.props;
		const { isActive } = this.state;

    return ReactDOM.createPortal(
			<div className={classNames('movie-details-modal', {'is-active': isActive })}>
				<button
					className="movie-details-modal__close"
					onClick={ this.handleCloseClick }
				/>

				<div className="movie-details">
					<TMDBImage src={poster_path} className="movie-details__poster" />

					<div className="movie-details__description">
						<h2>{title}({original_title})</h2>

						<div>
							<h4 className="movie-details__vote">Rank(votes count)</h4>: <span>{vote_average}({vote_count})</span>
						</div>
						<span className="movie-details__overview">{overview}</span>
					</div>
				</div>
			</div>,
      this.modal,
    );
  }
}

export default MovieDetailsModal;
