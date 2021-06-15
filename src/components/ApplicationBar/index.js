import AuthNavigation from '../AuthNavigation';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import * as authSelectors from '../../redux/auth/selectors-auth';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function ApplicationBar() {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  const clasess = useStyle();
  return (
    <Toolbar className={clasess.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
    </Toolbar>
  );
}
