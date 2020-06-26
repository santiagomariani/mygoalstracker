import React from 'react'
import GoalType from './GoalType'
import AddGoalType from './AddGoalType'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const styles = {
    goalTypesContainer: {
        borderRadius: '6px',
        backgroundColor: '#ccc',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundImage: 'linear-gradient(130deg, #485545 0%, #2e7204 88%)',
        borderStyle: 'solid',
        borderWidth: '1.2px',
        webkitBoxShadow: '0px 3px 26px -5px rgba(54,128,24,1)',
        mozBoxShadow: '0px 3px 26px -5px rgba(54,128,24,1)',
        boxShadow: '0px 3px 26px -5px rgba(54,128,24,1)',
        borderColor: '#00aa00',
        padding: '3%',
        margin: '20px auto',
        position: 'relative'
    },
    addGoalType: {
        marginBottom: '0px'
    },
    goalType: {
        borderRadius: '20px',
        backgroundColor: '#1a1a1a',
        width:'100%',
        marginBottom:'20px'
    }
}


class Goals extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            goalTypes: [],
            goalTypesReady: 0
        }
    }

    componentDidMount() {
        fetch('/api/goal_types', {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('usertoken')
            }
        })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(goalTypes => this.setState({goalTypes: goalTypes}))
    }

    onClickDeleteGoalType = (index) => {
        this.setState((state, props) => {
            let id = state.goalTypes[index]['id']
            let goalTypes = state.goalTypes
            goalTypes.splice(index, 1)
            fetch('/api/goal_type/' + id.toString(), {
                method: 'DELETE',
                headers: {
                    'x-access-token': localStorage.getItem('usertoken')
                }
            })
            .catch(err => console.error(err))
            return {goalTypes: goalTypes}
        })
    }

    onClickAddGoalType = (nameOfGoalType, descriptionOfGoalType) => {
        fetch('/api/goal_type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('usertoken')
            },
            body: JSON.stringify({'name': nameOfGoalType, 'description': descriptionOfGoalType}) 
            })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(goalType => this.setState((state) => {
                let goalTypes = state.goalTypes;
                goalTypes.push(goalType);
                return {'goalTypes': goalTypes}
            })
        )
    }

    onClickModifyGoalType = (nameOfGoalType, descriptionOfGoalType, index) => {
        this.setState((state, props) => {
            let id = state.goalTypes[index]['id']
            fetch('/api/goal_type/' + id.toString(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('usertoken')
                },
                body: JSON.stringify({'name': nameOfGoalType, 'description': descriptionOfGoalType})
            })
            .catch(err => console.error(err))
            
            let goalTypes = state.goalTypes
            console.log(nameOfGoalType)
            console.log(descriptionOfGoalType)
            goalTypes[index]['name'] = nameOfGoalType
            goalTypes[index]['description'] = descriptionOfGoalType

            return {goalTypes: goalTypes}
        })
    }

    onClickSignOut = () => {
        localStorage.setItem('usertoken', '')
        this.props.setToken('')
        this.props.history.push('/')
    }

    incGoalTypesReady = () => {
        this.setState((state) => {
            return {goalTypesReady: state.goalTypesReady + 1}
        })
    }

    goalTypesAreReady = () => {
        return this.state.goalTypesReady === this.state.goalTypes.length
    }

    render() {
        return(
            <Container component='main'>
        <CssBaseline />
        <Zoom in={true}>
        <Grid container spacing={3}
                        xs={11}
                        sm={8}
                        md={6} 
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        style={styles.goalTypesContainer} >

            <Grid style={styles.addGoalType} xs={12} item>
                <Typography style={styles.addGoalType} variant='body1'>Goals of Santiago Mariani</Typography>
            </Grid>

            <Grid style={styles.addGoalType} xs={12} item>
                <Button onClick={this.onClickSignOut} variant="outlined">Sign Out</Button>
            </Grid>
            
            <Grid style={styles.addGoalType} xs={12} item>
                <AddGoalType onClickAddGoalType={this.onClickAddGoalType} />
            </Grid>

            {
                this.state.goalTypes.map((goalType, i) => (
                <Zoom in={this.goalTypesAreReady()}>
                <Grid style={this.goalTypesAreReady() ? styles.goalType: {display: 'none'}} xs={12} item>
                    <GoalType
                        key={goalType['id']}
                        nameOfGoalType={goalType['name']}
                        descriptionOfGoalType={goalType['description']}
                        goalTypeId={goalType['id']}
                        index={i}
                        onClickDeleteGoalType={this.onClickDeleteGoalType}
                        onClickModifyGoalType={this.onClickModifyGoalType}
                        incGoalTypesReady={this.incGoalTypesReady}
                    />
                </Grid>
                </Zoom>
            ))
            }
        </Grid>
        </Zoom>
        </Container>
        )
    }
}

//export default Goals
export default withRouter(Goals);