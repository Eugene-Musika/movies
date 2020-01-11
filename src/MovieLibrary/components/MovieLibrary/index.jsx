import './styles.css';

import React, { Component } from 'react';
import { getFinishStatus, getLastFetchedPage, getMovies, getPendingStatus } from '../../store/selectors';

import MoviesList from '../MoviesList';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNowPlayingMovies } from '../../store/actions';
import logo from '../../assets/logo.svg';
import throttle from 'lodash/throttle';

class MovieLibrary extends Component {

	static propTypes = {
		movies: PropTypes.array.isRequired,
		pending: PropTypes.bool.isRequired,
		lastFetchedPage: PropTypes.number.isRequired,
		finished: PropTypes.bool.isRequired,
		actions: PropTypes.shape({ fetchNowPlayingMovies: PropTypes.func.isRequired }),
	}

	componentDidMount () {
		const { actions: { fetchNowPlayingMovies } } = this.props;

		fetchNowPlayingMovies();
		window.addEventListener('scroll', this.handlePageScroll);
	}

	componentWillUnmount () {
		window.removeEventListener('scroll', this.handlePageScroll);
	}


	handlePageScroll = throttle(() => {
		const {
			pending,
			finished,
			lastFetchedPage,
			actions: { fetchNowPlayingMovies },
		} = this.props;

		if (pending) { return; }

		if (finished) {
			window.removeEventListener('scroll', this.handlePageScroll);

			return;
		}

		const $html = window.document.documentElement;
		const scrollDistanceLeft = $html.scrollHeight - $html.clientHeight - $html.scrollTop;

		if (scrollDistanceLeft < 300) {
			fetchNowPlayingMovies([lastFetchedPage + 1]);
		}
	});


	render () {
		const { movies, pending } = this.props;


		return (
			<div className="MovieLibrary">
				<header className="ML-header">
					<img src={ logo } className="ML-logo" alt="logo" />
					<h1 className="ML-title">Movies</h1>
				</header>
				<div className="ML-intro">
					{ movies.length > 0 && <MoviesList movies={ movies } /> }
				</div>

				{ pending && 'Loading...' }
			</div>
		);
	}
}


function mapStateToProps (state) {
	return {
		movies: getMovies(state),
		lastFetchedPage: getLastFetchedPage(state),
		pending: getPendingStatus(state),
		finished: getFinishStatus(state),
	};
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators({ fetchNowPlayingMovies }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieLibrary);
