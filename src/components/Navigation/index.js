import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import { Box, Toolbar, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import * as authSelector from '../../redux/auth/selectors-auth';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  color: {
    color: 'red',
  },
}));
export default function Navigation() {
  const isLoggedIn = useSelector(authSelector.getIsAuthenticated);
  const styless = useStyles();
  return (
    <Toolbar>
      <Box className={styless.margin}>
        <ListItem
          button
          exact
          component={NavLink}
          to={routes.home}
          variant="contained"
          size="small"
          color="primary"
          activeClassName={styless.color}
        >
          Main
        </ListItem>
      </Box>
      {isLoggedIn && (
        <ListItem
          button
          component={NavLink}
          to={routes.contacts}
          variant="contained"
          size="small"
          color="primary"
          activeClassName={styless.color}
        >
          Contacts
        </ListItem>
      )}
    </Toolbar>
  );
}
