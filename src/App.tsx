import { Suspense, lazy } from 'react';
import { Route, Switch } from "react-router-dom";

import { routes } from './core';
import { NotFound } from './components';
import './App.scss';

// application routes
const Login = lazy(() => import('./views/Auth/Login/Login'));
const Signup = lazy(() => import('./views/Auth/Signup/Signup'));
const Home = lazy(() => import('./views/Home/Home'));

const App = () => {
  return (
    <Suspense fallback={<div className='loader-text'>Loading</div>}>
      <Switch>
        {/* auth routes */}
        <Route exact path="/" component={() => <Login />} />
        <Route exact path={routes.login} component={() => <Login />} />
        <Route exact path={routes.signup} component={() => <Signup />} />

        {/* home routes */}
        <Route exact path={routes.home} component={() => <Home />} />

        {/* Error route */}
        <Route exact path="*" component={() => <NotFound />} />
      </Switch>
    </Suspense>
  );
};


export default App;
