import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

export default function SignUpHeader({classes}) {

    return (
    <>
    <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
    </Avatar>
    <Typography component='h1' variant='h5'>
        Sign up
    </Typography>
    </>
    )
}