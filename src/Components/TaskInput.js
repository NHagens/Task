import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
    root: {
        margin: "16px",
        padding: "16px",
    },
    section: {
        margin: "8px"
    },
    form: {
        margin: "auto"
    }
});

class TaskInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            startTime: this.getDateTime(),
            endTime: this.getDateTime(1),
            saveSuccess: "none",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getDateTime(extraHours = 0) {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + today.getMonth()).slice(-2);
        let date = ('0' + today.getDate()).slice(-2);

        let hours = ('0' + (today.getHours() + extraHours)).slice(-2);
        let minutes = ('0' + today.getMinutes()).slice(-2);

        return `${year}-${month}-${date}T${hours}:${minutes}`;
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        fetch(`http://localhost:8080/task/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then (data => {
                let result = data.entity;
                this.setState({saveSuccess: result})
            });
        event.preventDefault();
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid>
                <Grid className={classes.form} item xs={5}>
                    <Card className={classes.root}>
                        <h1>New task</h1>
                        <div className={classes.section}>
                            <TextField className={classes.section} id="TaskName" label="Name" onChange={this.handleChange} /><br/>
                            <TextField className={classes.section} id="TaskDescription" label="Description" fullWidth multiline rows={4} variant="outlined" onChange={this.handleChange} />
                        </div>

                        <div className={classes.section}>
                            <TextField className={classes.section} id="StartTime" label="Start time" type="datetime-local" defaultValue={this.state.startTime} onChange={this.handleChange}/>
                            <TextField className={classes.section} id="EndTime" label="End time" type="datetime-local" defaultValue={this.state.endTime} onChange={this.handleChange}/> <br/>
                        </div>

                        <Button className={classes.section} onClick={this.handleSubmit} color="primary" variant="contained">Save</Button>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

export default withStyles(useStyles)(TaskInput)
