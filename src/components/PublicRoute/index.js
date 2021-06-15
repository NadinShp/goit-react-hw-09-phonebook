import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as authSelectors from '../../redux/auth/selectors-auth';

const PublicRoute = ({
  isAuthenticated,
  redirectTo,
  children,
  ...routeProps
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        children
      )}
    </Route>
  );
};

export default PublicRoute;
