import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    root: {
        margin: "16px",
        padding: "16px",
    },
});

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        let loadedTasks = [];

        fetch(`http://localhost:8080/task/findAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);

                data.entity.forEach(task => {
                loadedTasks.push(task);
            });

            this.setState({tasks: loadedTasks});
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid container spacing={8}>
                {this.state.tasks.map(task => (
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <Typography variant="h4" component="h2">
                                {task.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {task.description}
                            </Typography>
                            <Typography color="textSecondary">
                                {task.startTime} <br/>
                                {task.endTime}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Calendar)

// Change for jenkins test
