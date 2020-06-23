import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

const useStyles = theme => ({
    section: {
        margin: "8px"
    },
});

class MockLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        console.log(this.state);

        fetch(`http://localhost:8080/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("Authorization", data);
            })
    }

    handleChange (event, valueX) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Paper>
                        <div className={classes.section}>
                            <TextField className={classes.section} name="username" label="Username" onChange={this.handleChange} /><br/>
                            <TextField className={classes.section} name="password" label="Password" onChange={this.handleChange} />
                        </div>
                        <Button className={classes.section} id="Login" onClick={this.login} color="primary" variant="contained">Log in</Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(withStyles(useStyles)(MockLogin));
