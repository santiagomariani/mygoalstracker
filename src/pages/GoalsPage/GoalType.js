import React, { useState, useEffect }  from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import GoalsList from './GoalsList'
import AddGoal from './AddGoal'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ModifyGoalType from './ModifyGoalType'
import Zoom from '@material-ui/core/Zoom';

const styles = {
    container: {
    },
    goalTypeName: {
    },
    goalTypeDescription: {
    },
    addGoal: {
    },
    goalsList: {
    },
    buttons: {
        padding: '0'
    },
    hyphens: { 
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        webkitHyphens: 'auto',
        msHyphens: 'auto',
        mozHyphens: 'auto',
        hyphens: 'auto'
    },
    goalType: {
        borderRadius: '20px',
        backgroundColor: '#1a1a1a',
        width:'100%',
        marginBottom:'20px'
    }
}

export default function GoalType(props){
    const [goals, setGoals] = useState(null)

    useEffect(() => {
        fetch('/api/goals_of_type_id/' + props.goalTypeId.toString(), {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(goals => {
            setGoals(goals)
        })
    }, [])

    const onClickDeleteGoal = (index) => {
        let id = goals[index]['id']
        fetch('/api/goal/' + id.toString(), {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
        .then(res => {
            const temp = [...goals]
            temp.splice(index, 1)
            setGoals(temp)
        })
        .catch(err => console.error(err))
    }

    const onClickAddGoal = (nameOfGoal, descriptionOfGoal) => {
        fetch('/api/goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('usertoken')
            },
            body: JSON.stringify({'name': nameOfGoal,
                                'description': descriptionOfGoal,
                                'goal_type_id': props.goalTypeId}) 
            })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(goal => setGoals(goals.concat(goal))) 
    }

    const onClickModifyGoal = (nameOfGoal, descriptionOfGoal, index) => {
        let id = goals[index]['id']
        fetch('/api/goal', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('usertoken')
            },
            body: JSON.stringify({'id': id,
                                'name': nameOfGoal,
                                'description': descriptionOfGoal})
        })
        .catch(err => console.error(err))
        
        let tempGoals = [...goals]
        tempGoals[index]['name'] = nameOfGoal
        tempGoals[index]['description'] = descriptionOfGoal
        setGoals(tempGoals)
    }

    if (goals) {
        return (
            <Zoom in={true}> 
                <Grid style={styles.goalType} xs={12} item>
                    <Grid style={styles.container} container spacing={1} direction="row" alignItems="center" justify="flex-start">
                        <Grid item xs={10}>
                            <Typography style={styles.hyphens} variant="h3" gutterBottom>
                                {props.nameOfGoalType}
                            </Typography>
                            <Typography style={styles.hyphens} variant="body1" gutterBottom>
                                {props.descriptionOfGoalType}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} style={styles.buttons}>
                            <Grid container spacing={0} direction="row" alignItems="center" justify="flex-start">
                                <Grid xs={6} align="center" style={{padding: 0}} item>
                                    <IconButton  size={'small'} edge='end' aria-label='delete' onClick={() => props.onClickDeleteGoalType(props.index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid xs={6} align="center" item>
                                    <ModifyGoalType onClickModifyGoalType={props.onClickModifyGoalType} index={props.index} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <AddGoal style={styles.addGoal} onClickAddGoal={onClickAddGoal} />
                        </Grid>
                        <Grid item xs={12}>
                        <GoalsList  style={styles.goalsList} items={goals}
                            onClickDeleteItem={onClickDeleteGoal} 
                            onClickModifyGoal={onClickModifyGoal}
                            />
                        </Grid> 
                    </Grid>
                </Grid>
            </Zoom>)
    } else {
        return <div></div>
    }
}