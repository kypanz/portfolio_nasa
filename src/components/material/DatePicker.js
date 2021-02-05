import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  const onChangeDate = props.onChangeDate;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        defaultValue="2021-01-1"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{background:'white',padding:'15px',borderRadius:'5px',margin:'auto'}}
        onChange={ (e)=> onChangeDate(e.target.value) }
      />
    </form>
  );
}
