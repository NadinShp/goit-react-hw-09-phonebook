import 'modern-normalize/modern-normalize.css';
import { Switch, Route } from 'react-router-dom';
import ApplicationBar from './components/ApplicationBar';
import { AppBar, Container } from '@material-ui/core';
import { useEffect, Suspense, lazy } from 'react';
import * as authOperations from './redux/auth/operations-auth';
import { useDispatch } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Loader from './components/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView' /*webpackChunkName: "HomeView" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /*webpackChunkName: "LoginView" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /*webpackChunkName: "RegisterView" */),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /*webpackChunkName: "ContactsView" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('UseEffect');
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <AppBar position="relative">
        <Container fixed>
          {/* <Toolbar> */}
          <ApplicationBar />
          {/* </Toolbar> */}
        </Container>
      </AppBar>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <PublicRoute
            path="/register"
            component={RegisterView}
            restricted
            redirectTo={'/contacts'}
          />
          <PublicRoute
            path="/login"
            restricted
            component={LoginView}
            redirectTo={'/contacts'}
          />
          <PrivateRoute
            path="/contacts"
            component={ContactsView}
            redirectTo="/login"
          />
        </Switch>
      </Suspense>
    </>
  );
}
