import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

export default function ModifyListItem ({ buttonComponent, dialogTitle, onClickModify, index }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [nameOfListItem, setNameOfListItem] = React.useState('')
  const [listItemDescription, setListItemDescription] = React.useState('')
  const [noNameOfListItemError, setNoNameOfListItemError] = React.useState(false)

  const handleChangeNameOfListItem = (e) => {
    setNameOfListItem(e.target.value)
  }

  const handleChangeListItemDescription = (e) => {
    setListItemDescription(e.target.value)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClickCancel = () => {
    setOpen(false)
    setNameOfListItem('')
    setListItemDescription('')
    setNoNameOfListItemError(false)
  }

  const handleClickOk = () => {
    if (nameOfListItem !== '') {
      setOpen(false)
      onClickModify(nameOfListItem, listItemDescription, index)
      setNameOfListItem('')
      setListItemDescription('')
      setNoNameOfListItemError(false)
    } else {
      setNoNameOfListItemError(true)
    }
  }

  return (
    <>
      {buttonComponent(handleOpen)}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClickCancel}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <TextField
              error={noNameOfListItemError}
              id='standard-basic'
              label='Name'
              fullWidth='true'
              FormHelperTextProps={{ error: noNameOfListItemError }}
              helperText={noNameOfListItemError ? 'Must insert the name' : ''}
              onChange={handleChangeNameOfListItem}
              required
            />

            <TextField
              id='standard-textarea'
              label='Description'
              onChange={handleChangeListItemDescription}
              multiline
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel} color='primary'>
          Cancel
          </Button>
          <Button onClick={handleClickOk} color='primary'>
          Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>)
}
