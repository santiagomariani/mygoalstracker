import React from 'react' 
import TextField from '@material-ui/core/TextField'

export default function SignUpEmailField({value, onChange, error}) {

  let error_message, have_an_error

  if (error !== '') {
    have_an_error = true  
    if (error === 'required') {
      error_message = 'Must insert the password'
    } else if (error === 'regex') {
      error_message = 'Must have at least one uppercase and one number, and a min of 8 chars.'
    }
  }
    return (
        <TextField
              error={have_an_error}
              FormHelperTextProps={{ error: have_an_error }}
              helperText={have_an_error ? error_message: ''}
              onChange={onChange}
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={value}
              autoComplete='current-password'
            />
    )
}