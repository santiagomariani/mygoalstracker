import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ModifyListItem from './ModifyListItem.js'

export default function ModifyGoal ({ onClickModifyGoal, index }) {

    return (<ModifyListItem buttonComponent={(onClick) => <IconButton size={'small'} onClick={onClick} edge='end' aria-label='edit'>
                                                            <EditIcon />
                                                        </IconButton>}
                        onClickModify={onClickModifyGoal}
                        index={index}
                        dialogTitle={'Modify the goal'} />)
}
