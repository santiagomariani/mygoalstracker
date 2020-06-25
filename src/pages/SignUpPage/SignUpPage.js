import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { withRouter } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';
import Copyright from 'components/Copyright';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SignUpFirstNameField from './SignUpFirstNameField'
import SignUpLastNameField from './SignUpLastNameField'
import SignUpEmailField from './SignUpEmailField'
import SignUpPasswordField from './SignUpPasswordField'
import { trackPromise} from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUpPage () {
  const classes = useStyles()
  const { promiseInProgress } = usePromiseTracker();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({'first_name':'', 
                                        'last_name':'',
                                        'email':'',
                                        'password':''})
  const history = useHistory()

  const handleChangeUserFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const handleChangeUserLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleChangeUserEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangeUserPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleClickSignUp = (e) => {
      e.preventDefault()
      trackPromise(
        fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password
            }
            )
        }).then((response) => response.json())
          .then((data) => {
            if (data['message'] !== 'OK') {
              let api_errors = data['message']
              let new_errors = {'first_name':'', 
                                'last_name':'',
                                'email':'',
                                'password':''} 
              for (let field in api_errors) {
                new_errors[field] = api_errors[field][0]
              }
              setErrors(new_errors)
            } else {
              history.push('/')
            }
        }).catch(err => console.error(err))
      )
  }

  return (
    <>
    {promiseInProgress ? <LinearProgress />: null }
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
            Sign up
        </Typography>

        <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <SignUpFirstNameField 
                        value={firstName} 
                        onChange={handleChangeUserFirstName} 
                        error={errors.first_name} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SignUpLastNameField
                        value={lastName}
                        onChange={handleChangeUserLastName}
                        error={errors.last_name} />
                  </Grid>
                  <Grid item xs={12}>
                    <SignUpEmailField
                        value={email}
                        onChange={handleChangeUserEmail}
                        error={errors.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <SignUpPasswordField
                        value={password}
                        onChange={handleChangeUserPassword}
                        error={errors.password} />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  onClick={handleClickSignUp}
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Link href='/' variant='body2'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </>)
}
