import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import GoalsList from './GoalsList'
import AddGoal from './AddGoal'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ModifyGoalType from './ModifyGoalType'


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
    }
}

class GoalType extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            goals: []
        }
    }

    componentDidMount() {
        fetch('/api/goals_of_type_id/' + this.props.goalTypeId.toString(), {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(goals => this.setState({goals: goals}))
    }

    onClickDeleteGoal = (index) => {
        this.setState((state, props) => {
            let id = state.goals[index]['id']
            fetch('/api/goal/' + id.toString(), {
                method: 'DELETE',
                headers: {
                    'x-access-token': localStorage.getItem('usertoken')
                }
            })
            .catch(err => console.error(err))
            let goals = state.goals
            goals.splice(index, 1)
            return {goals: goals}
        })
    }

    onClickAddGoal = (nameOfGoal, descriptionOfGoal) => {
        fetch('/api/goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('usertoken')
            },
            body: JSON.stringify({'name': nameOfGoal,
                                'description': descriptionOfGoal,
                                'goal_type_id': this.props.goalTypeId}) 
            })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(goal => this.setState((state) => {
                let goals = state.goals;
                goals.push(goal);
                return {'goals': goals}
            })
        )
    }

    onClickModifyGoal = (nameOfGoal, descriptionOfGoal, index) => {
        this.setState((state, props) => {
            let id = state.goals[index]['id']
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
            
            let goals = state.goals
            
            goals[index]['name'] = nameOfGoal
            goals[index]['description'] = descriptionOfGoal

            return {goals: goals}
        })
    }

    render() {
        return(
        <div>
        <Grid style={styles.container} container spacing={1} direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={10}>
                <Typography style={styles.hyphens} variant="h3" gutterBottom>
                    {this.props.nameOfGoalType}
                </Typography>
                <Typography style={styles.hyphens} variant="body1" gutterBottom>
                    {this.props.descriptionOfGoalType}
                </Typography>
            </Grid>
            <Grid item xs={2} style={styles.buttons}>
                <Grid container spacing={0} direction="row" alignItems="center" justify="flex-start">
                    <Grid xs={6} align="center" style={{padding: 0}} item>
                        <IconButton  size={'small'} edge='end' aria-label='delete' onClick={() => this.props.onClickDeleteGoalType(this.props.index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid xs={6} align="center" item>
                        <ModifyGoalType onClickModifyGoalType={this.props.onClickModifyGoalType} index={this.props.index} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <AddGoal style={styles.addGoal} onClickAddGoal={this.onClickAddGoal} />
            </Grid>
            <Grid item xs={12}>
            <GoalsList  style={styles.goalsList} items={this.state.goals}
                   onClickDeleteItem={this.onClickDeleteGoal} 
                   onClickModifyGoal={this.onClickModifyGoal}
                   />
            </Grid> 
        </Grid> 
        </div>)
    }
}

export default GoalType