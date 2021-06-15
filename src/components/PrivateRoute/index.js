import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as authSelectors from '../../redux/auth/selectors-auth';

export default function PrivateRoute({
  children,
  isAuthenticated,
  redirectTo,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
