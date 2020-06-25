import React from 'react'
import Button from '@material-ui/core/Button'
import AddListItem from './AddListItem'

export default function AddGoalType ({onClickAddGoalType}) {
  return (<AddListItem buttonComponent={(onClick) => <Button variant="outlined" onClick={onClick}>Add a new Goal Type</Button>}
                        onClickAdd={onClickAddGoalType}
                        dialogTitle={'Add a new Goal Type'} />)
}
