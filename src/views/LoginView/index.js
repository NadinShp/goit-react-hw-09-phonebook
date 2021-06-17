import { useDispatch } from 'react-redux';
import * as authOperations from '../../redux/auth/operations-auth';

import { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    maxWidth: '400px',
    width: '100%',
    margin: '20px auto',
  },
  btn: {
    position: 'absolute',
    bottom: '-45px',
    left: '40%',
    display: 'inline-flex',
    justifyContent: 'center',
  },
}));
export default function LoginView() {
  const dispatch = useDispatch();
  const onLogin = data => dispatch(authOperations.logIn(data));

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handleChange = ({ target: { value, name } }) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };
  // const handleChange =
  //   prop =>
  //   ({ target: { value } }) => {
  //     setUser(prev => ({ ...prev, [prop]: value }));
  //   };
  const handleSubmit = e => {
    e.preventDefault();
    onLogin(user);
  };
  const styless = useStyles();
  return (
    <Container>
      <form onSubmit={handleSubmit} className={styless.form}>
        <TextField
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={user.email}
        />
        <TextField
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={user.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styless.btn}
        >
          Log in
        </Button>
      </form>
    </Container>
  );
}
