import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class MockLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.login = this.login.bind(this)
    }

    login(user) {
        localStorage.setItem("user", user.name);
    }

    componentDidMount() {
        fetch(`http://localhost:8080/user/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({users: data})
            })
    }

    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    {this.state.users.map(user => (
                        <Button
                            key={user.id}
                            id={user.name}
                            onClick={ () => this.login(user) }
                            color="primary"
                            variant="contained">
                            {user.name}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        )
    }
}

export default MockLogin;
