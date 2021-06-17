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
          <ApplicationBar />
        </Container>
      </AppBar>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <PublicRoute path="/register" restricted redirectTo={'/contacts'}>
            <RegisterView />
          </PublicRoute>
          <PublicRoute path="/login" restricted redirectTo={'/contacts'}>
            <LoginView />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsView />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </>
  );
}
