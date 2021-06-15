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
  const [name, setName] = useState('');
  const handleChangeName = e => {
    setName(e.target.value);
  };
  const [email, setEmail] = useState('');
  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleCreateObj = (name, email, password) => {
    return { name, email, password };
  };
  const handleSubmit = e => {
    e.preventDefault();
    const userObj = handleCreateObj(name, email, password);
    onRegister(userObj);
  };
  const styless = useStyles();
  return (
    <Container>
      <form onSubmit={handleSubmit} className={styless.form}>
        <TextField
          onChange={handleChangeName}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={name}
        />
        <TextField
          onChange={handleChangeEmail}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
        />
        <TextField
          onChange={handleChangePassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
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
