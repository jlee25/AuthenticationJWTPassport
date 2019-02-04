import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from 'redux-thunk';
import history from './history';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Favourites from './components/Favourites';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import DisplayRecipes from './components/recipe/DisplayRecipes';
import storage from "redux-persist/lib/storage";
import RecipeInfo from './components/recipe/RecipeInfo';

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
  );
  
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" component={Signup} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/signout" component={Signout} />
            <Route path="/signin" component={Signin} />
            <Route path="/recipes/:query" exact component={DisplayRecipes} />
            <Route path="/recipes/:recipe/info" exact component={RecipeInfo} />
          </Switch>
        </App>
      </Router>
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);
