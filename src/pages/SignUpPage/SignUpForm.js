import React from 'react' 
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import SignUpFirstNameField from './SignUpFirstNameField'
import SignUpLastNameField from './SignUpLastNameField'
import SignUpEmailField from './SignUpEmailField'
import SignUpPasswordField from './SignUpPasswordField'

class SignUpForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errors: {'first_name':'', 
                        'last_name':'',
                        'email':'',
                        'password':''}
        }
    }

    handleChangeUserFirstName = (e) => {
      this.setState({firstName:e.target.value})
    }
  
    handleChangeUserLastName = (e) => {
      this.setState({lastName:e.target.value})
    }
  
    handleChangeUserEmail = (e) => {
        this.setState({email: e.target.value})
    }
  
    handleChangeUserPassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleClickSignUp = (e) => {
        e.preventDefault()
        fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              email: this.state.email,
              password: this.state.password
            }
            )
        }).then((response) => response.json())
          .then((data) => {
            if (data['message'] !== 'OK') {
                this.setState((state, props) => {
                    let errors = data['message']
                    let old_errors = state.errors 
                    for (let field in old_errors) {
                        if (errors[field]) {
                            old_errors[field] = errors[field][0]
                        } else {
                            old_errors[field] = ''
                        }
                    }
                    return {errors: old_errors}
                })
            } else {
                this.props.history.push('/')
            }
        }).catch(err => console.error(err))
    }

    render() {

        return (
            <form className={this.props.classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <SignUpFirstNameField 
                        value={this.state.firstName} 
                        onChange={this.handleChangeUserFirstName} 
                        error={this.state.errors.first_name} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SignUpLastNameField
                        value={this.state.lastName}
                        onChange={this.handleChangeUserLastName}
                        error={this.state.errors.last_name} />
                  </Grid>
                  <Grid item xs={12}>
                    <SignUpEmailField
                        value={this.state.email}
                        onChange={this.handleChangeUserEmail}
                        error={this.state.errors.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <SignUpPasswordField
                        value={this.state.password}
                        onChange={this.handleChangeUserPassword}
                        error={this.state.errors.password} />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  onClick={this.handleClickSignUp}
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={this.props.classes.submit}
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
              </form>)
    }
}

export default SignUpForm