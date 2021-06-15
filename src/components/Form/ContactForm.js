import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as contactOperation from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const shortid = require('shortid');
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
export default function ContactForm() {
  const styless = useStyles();
  const items = useSelector(selectors.getContacts);
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    contact => {
      dispatch(contactOperation.addContact(contact));
    },
    [dispatch],
  );
  const [name, setName] = useState('');

  const changeName = e => {
    setName(e.target.value);
  };
  const [number, setNumber] = useState('');
  const changeNumber = e => {
    setNumber(e.target.value);
  };
  const handleCreateContactsObject = (name, number) => {
    return {
      name,
      number,
      id: shortid.generate(),
    };
  };
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setName('');
      setNumber('');
      const checkingContact = items.find(
        item => item.name.toLowerCase() === name.toLowerCase(),
      );
      if (checkingContact) {
        return alert(`${name} is already in contacts`);
      } else {
        const newContact = handleCreateContactsObject(name, number);
        onSubmit(newContact);
      }
    },
    [items, name, number, onSubmit],
  );
  return (
    <form onSubmit={handleSubmit} className={styless.form}>
      <TextField
        onChange={changeName}
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
        onChange={changeNumber}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="tel"
        label="Telephone number"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        autoFocus
        value={number}
      />
      <Button
        className={styless.btn}
        variant="contained"
        color="primary"
        type="submit"
      >
        Add contact
      </Button>
    </form>
  );
}
ContactForm.defaultProps = {
  name: '',
  number: '',
};
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmit: PropTypes.func,
};
