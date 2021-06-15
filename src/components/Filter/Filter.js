import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as actionsPhonebook from '../../redux/phonebook/actions-phonebook';
import * as selectors from '../../redux/phonebook/selector-phonebook';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    width: '100%',
    margin: 'auto',
  },
}));

export default function Filter() {
  const styless = useStyles();
  const value = useSelector(selectors.getFilter);
  const dispatch = useDispatch();
  const onChangeFilter = useCallback(
    e => {
      dispatch(actionsPhonebook.changeFilter(e.target.value));
    },
    [dispatch],
  );
  return (
    <>
      <TextField
        className={styless.input}
        variant="outlined"
        margin="normal"
        label="Find contacts by name"
        name="filter"
        autoFocus
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </>
  );
}

Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};
