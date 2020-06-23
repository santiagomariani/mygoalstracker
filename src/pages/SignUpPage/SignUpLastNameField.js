import React from 'react' 
import TextField from '@material-ui/core/TextField'

export default function SignUpLastNameField({value, onChange, error}) {

  let error_message, have_an_error

  if (error !== '') {
    have_an_error = true  
    if (error === 'max_length') {
      error_message = 'Last name can have a max of 50 chars'
    }
  }
    return (
        <TextField
            error={have_an_error}
            FormHelperTextProps={{ error: have_an_error }}
            helperText={have_an_error ? error_message : ''}
            onChange={onChange}
            autoComplete='lname'
            name='lastName'
            variant='outlined'
            fullWidth
            id='lastName'
            label='Last Name'
            value={value}
            autoFocus
        />
    )
}