import React, { Component } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';

import MovieLibrary from './MovieLibrary';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


class App extends Component {
	render () {
		return (
      <Provider store={ store }>
        <MovieLibrary />
      </Provider>
		);
	}
}

export default App;
