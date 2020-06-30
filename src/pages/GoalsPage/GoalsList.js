import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialList from '@material-ui/core/List'
import MaterialListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import ModifyGoal from './ModifyGoal'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import './styles.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: '#2c781f',
    backgroundImage: 'linear-gradient(132deg, #2c781f 0%, #4ec207 88%)',
    borderRadius: '10px'
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }, 
  hyphens: { 
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    webkitHyphens: 'auto',
    msHyphens: 'auto',
    mozHyphens: 'auto',
    hyphens: 'auto'
  },
}))

const styles = {
  hyphens: { 
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    webkitHyphens: 'auto',
    msHyphens: 'auto',
    mozHyphens: 'auto',
    hyphens: 'auto'
  }
}

const GoalsListItem = ({ itemValue, index, onClickDeleteItem, onClickModifyGoal }) => {
  
  return (

      <MaterialListItem>
        {/*
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>*/}
        <Grid container spacing={1} direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={10}>
              <ListItemText
                primary={<Typography style={styles.hyphens} variant="subtitle2" gutterBottom>
                            {itemValue.name}
                        </Typography>}
                secondary={<Typography style={styles.hyphens} variant="body2" gutterBottom>
                            {itemValue.description}
                          </Typography>}
              />
            </Grid>
            <Grid item xs={2}>
              <ListItemSecondaryAction>
                <IconButton size={'small'} edge='end' aria-label='delete' onClick={() => onClickDeleteItem(index)}>
                  <DoneIcon />
                </IconButton>
                <ModifyGoal onClickModifyGoal={onClickModifyGoal}
                            index={index} />
              </ListItemSecondaryAction>
            </Grid>
        </Grid>
        
      </MaterialListItem>)
}

export default function GoalsList ({ items, onClickDeleteItem, onClickModifyGoal }) {
  const classes = useStyles()

  return (
    <div className={classes.demo}>
      <MaterialList className={"sasa"} dense={false}>
        <TransitionGroup>
        {
          items.map((item, i) => (
            <CSSTransition
              key={item.id}
              timeout={350}
              classNames="item"
            >
              <GoalsListItem
                index={i}
                itemValue={item}
                onClickDeleteItem={onClickDeleteItem}
                onClickModifyGoal={onClickModifyGoal} />
              </CSSTransition>
              )
          )
        }
        </TransitionGroup>
      </MaterialList>
    </div>
  )
}
