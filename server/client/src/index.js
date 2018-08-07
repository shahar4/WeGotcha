import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';//takes in the combineReducers from reducers/index.js


//redux-thunk ispects whatever value we return from action creaters. If redux-thunk sees that we return a
//func instead of a normal action, it'll automatically call that fun and pass the dispatch func as an arg.

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);