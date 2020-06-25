import React from 'react'
import Button from '@material-ui/core/Button'
import AddListItem from './AddListItem'

export default function AddGoal ({onClickAddGoal}) {
  return (<AddListItem buttonComponent={(onClick) => <Button variant="outlined" onClick={onClick}>Add a new Goal</Button>}
                        onClickAdd={onClickAddGoal}
                        dialogTitle={'Add a new Goal'} />)
}
