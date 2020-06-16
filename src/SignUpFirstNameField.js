import React from 'react' 
import TextField from '@material-ui/core/TextField'

export default function SignUpFirstNameField({value, onChange, error}) {

  let error_message, have_an_error

  if (error !== '') {
    have_an_error = true  
    if (error === 'required') {
      error_message = 'Must insert the first name'
    } else if (error === 'max_length') {
      error_message = 'First name can have a max of 50 chars'
    }
  }
    return (
        <TextField
        error={have_an_error}
        FormHelperTextProps={{ error: have_an_error }}
        helperText={have_an_error ? error_message : ''}
        onChange={onChange}
        autoComplete='fname'
        name='firstName'
        variant='outlined'
        required
        fullWidth
        id='firstName'
        label='First Name'
        value={value}
        autoFocus
      />
    )
}