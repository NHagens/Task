import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import TaskInput from "./TaskInput";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = theme => ({
    root: {

    },
    taskCard: {
        margin: "0",
        padding: "0",
        overflow: "visible",
        minWidth: "180px",
        boxShadow: "10px"
    },
    dialog: {
        paperFullWidth: "8"
    },
    base: {
        overflow:"hidden",
        marginLeft: "128px",
        marginRight: "128px"
    },
    toolbar: {
        padding: "8px"
    }
});

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            dialogOpen: false,
            editedTask: null
        };

        this.deleteTask = this.deleteTask.bind(this);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.closeAddDialog = this.closeAddDialog.bind(this);
        this.editTask = this.editTask.bind(this);
        this.addTaskToState = this.addTaskToState.bind(this)
    }

    openAddDialog() {
        this.setState({dialogOpen: true});
    }
    closeAddDialog() {
        this.loadAllTasks();
        this.setState({dialogOpen: false,
        editedTask: null});
    }

    addTaskToState(task) {
        let tasksCopy = this.state.tasks;
        tasksCopy.push(task);
        this.setState({tasks: tasksCopy});
    }

    editTask(task) {
        this.setState({dialogOpen: true, editedTask: task})
    }

    deleteTask(task) {
        fetch(`http://localhost:8080/task/removeTask`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(data => {
                let tasksCopy = this.state.tasks;
                tasksCopy.splice(tasksCopy.indexOf(task), 1)
                this.setState({tasks: tasksCopy})
            });
    }

    loadAllTasks() {
        fetch(`http://localhost:8080/task/findAllFromUser?username=` + localStorage.getItem("user"), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({tasks: data});
            });
    }

    componentDidMount() {
        this.loadAllTasks();
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.base}>
            <Grid container spacing={4} className={classes.root}>
                <Grid item xs={12} >
                    <Card className={classes.toolbar}>
                        <Button
                            id="Create"
                            onClick={ this.openAddDialog }
                            color="primary"
                            variant="contained"
                            size="small">
                            New Task
                        </Button>
                    </Card>
                </Grid>


                {this.state.tasks.map(task => (
                    <Grid item xs={2} key={task.id}>
                        <Card className={classes.taskCard}>
                            <CardContent wrap="nowrap">
                                <Typography variant="h4" component="h2">
                                    {task.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {task.description}
                                </Typography>
                                {task.tags.map(tag =>
                                    (<Typography key={tag.id} variant="caption" component="p">{tag.name}</Typography>)
                                )}
                                <br/>
                                <Typography color="textSecondary">
                                    {task.startTime.replace("T"," ")} <br/>
                                    {task.endTime.replace("T"," ")}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    className={classes.section}
                                    id="Delete"
                                    onClick={ () => this.deleteTask(task) }
                                    color="primary"
                                    variant="contained"
                                    size="small">
                                        Delete
                                </Button>
                                <Button
                                    className={classes.section}
                                    id="Delete"
                                    onClick={ () => this.editTask(task) }
                                    color="primary"
                                    variant="contained"
                                    size="small">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

                <Dialog
                    className={classes.dialog}
                    open={this.state.dialogOpen}
                    onClose={this.closeAddDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogContent>
                        <TaskInput addTask={this.addTaskToState} closeHandler={this.closeAddDialog} task={this.state.editedTask}/>
                    </DialogContent>

                </Dialog>
            </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Calendar)

// Change for jenkins test 3
