import { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as authOperations from '../../redux/auth/operations-auth';

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
    left: '35%',
    display: 'inline-flex',
    justifyContent: 'center',
  },
}));

export default function RegisterView() {
  const dispatch = useDispatch();
  const onRegister = data => dispatch(authOperations.register(data));
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = ({ target: { value, name } }) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    onRegister(user);
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
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={user.name}
        />
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
          Registration
        </Button>
      </form>
    </Container>
  );
}
