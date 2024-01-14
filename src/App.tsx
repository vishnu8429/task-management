import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

import { auth, routes } from './core';
import { Loader, NotFound } from './components';

// application routes
const Login = lazy(() => import('./views/Auth/Login/Login'));
const Signup = lazy(() => import('./views/Auth/Signup/Signup'));
const Home = lazy(() => import('./views/Home/Home'));

/**
 * App
 * 
 * @returns 
 */
const App = () => {
  // fallback={<div className='loader-text'>Loading</div>}

  // handle page loading
  const [isLoading, setLoading] = useState(true);

  // handle default route
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // check user loggedin status
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        const uid = user.uid;
        if (uid !== null) {
          setUserLoggedIn(true);
        }
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* handle toast */}
      <ToastContainer />

      {/* app routes */}
      <Suspense>
        <Switch>
          {/* auth routes */}
          <Route exact path="/" component={() => isUserLoggedIn ? <Home /> : <Login />} />
          <Route exact path={routes.login} component={() => <Login />} />
          <Route exact path={routes.signup} component={() => <Signup />} />

          {/* home routes */}
          <Route exact path={routes.home} component={() => <Home />} />

          {/* Error route */}
          <Route exact path="*" component={() => <NotFound />} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
