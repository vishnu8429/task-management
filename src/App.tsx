import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

import { auth, routes } from './core';
import { Loader, NotFound } from './components';
import UserHelper from './helpers/user.helper';

// application routes
// auth routes
const Login = lazy(() => import('./views/Auth/Login/Login'));
const Signup = lazy(() => import('./views/Auth/Signup/Signup'));

// home route
const Home = lazy(() => import('./views/Home/Home'));

// profile route
const Profile = lazy(() => import('./views/Profile/Profile'));

/**
 * App
 * 
 * @returns 
 */
const App = () => {

  // handle page loading
  const [isLoading, setLoading] = useState<boolean>(true);

  // handle default route
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  // check user loggedin status
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user: any) => {
      setLoading(false);
      if (user) {
        const uid = user.uid;
        if (uid !== null) {
          setUserLoggedIn(true);
          UserHelper.saveUser(user);
        } else {
          UserHelper.deleteUser();
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
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* auth routes */}
          <Route exact path="/" component={() => isUserLoggedIn ? <Home /> : <Login />} />
          <Route exact path={routes.login} component={() => <Login />} />
          <Route exact path={routes.signup} component={() => <Signup />} />

          {/* home route */}
          <Route exact path={routes.home} component={() => <Home />} />

          {/* profile route */}
          <Route exact path={routes.profile} component={() => <Profile />} />

          {/* Error route */}
          <Route exact path="*" component={() => <NotFound />} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
