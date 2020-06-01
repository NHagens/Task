import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class ButtonAppBar extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <Button href="/index" color="inherit">
                            Home
                        </Button>
                    </Typography>
                    <Button href="/newTask" color="inherit">
                        Create Task
                    </Button>
                    </Toolbar>
            </AppBar>
        );
    }
}
