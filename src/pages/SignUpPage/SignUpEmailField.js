import React from 'react' 
import TextField from '@material-ui/core/TextField'

export default function SignUpEmailField({value, onChange, error}) {

  let error_message, have_an_error

  if (error !== '') {
    have_an_error = true  
    if (error === 'required') {
      error_message = 'Must insert the email'
    } else if (error === 'max_length') {
      error_message = 'Email is not valid'
    }
  }
    return (
        <TextField
            error={have_an_error}
            FormHelperTextProps={{ error: have_an_error }}
            helperText={have_an_error ? error_message : ''}
            onChange={onChange}
            variant='outlined'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={value}
            autoComplete='email'
        />
    )
}