import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contacts from '../../components/Contacts';
import ContactForm from '../../components/Form/ContactForm';
import Filter from '../../components/Filter/Filter';
import * as contactOperations from '../../redux/phonebook/operations-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
  text: {
    marginTop: '20px',
    textAlign: 'center',
  },
  contact: {
    marginTop: '60px',
    textAlign: 'center',
    marginBottom: '20px',
  },
}));

export default function ContactsView() {
  const contacts = useSelector(selectors.getContacts);
  const isLoadingContacts = useSelector(selectors.getLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(contactOperations.fetchContacts());
    }
  }, [dispatch, contacts.length]);
  const styless = useStyles();
  return (
    <Container>
      <Typography variant="h3" className={styless.text}>
        Phonebook
      </Typography>
      <ContactForm />
      <Typography variant="h4" className={styless.contact}>
        Contacts
      </Typography>
      <Filter />
      {isLoadingContacts && <Loader />}
      <Contacts />
    </Container>
  );
}
