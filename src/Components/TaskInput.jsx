import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
            availableTags: [],
            tags: [],

            errorVisibility: "hidden",
            errorText: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.addTag = this.addTag.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:8080/tag/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then (data => {
                this.setState({availableTags: data});
            });
    }

    getDateTime(extraHours = 0) {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth()+1)).slice(-2);
        let date = ('0' + today.getDate()).slice(-2);

        let hours = ('0' + (today.getHours() + extraHours)).slice(-2);
        let minutes = ('0' + today.getMinutes()).slice(-2);

        return `${year}-${month}-${date}T${hours}:${minutes}`;
    }

    handleChange (event, valueX) {
        this.setState({[event.target.name]: event.target.value});
    }

    addTag(event) {
        if (this.state.tags.length === 0 || !this.state.tags.includes(event.target.value)) {
            let tagsCopy = this.state.tags;
            tagsCopy.push(event.target.value);
            this.setState({tags: tagsCopy});
        }
    }

    removeTag(tag) {
        let tagsCopy = this.state.tags;

        let itemIndex = tagsCopy.indexOf(tag);

        tagsCopy.splice(itemIndex, 1);

        this.setState({tags: tagsCopy});
    }

    handleSubmit(event) {
        if (this.state.name == null || this.state.name === "") {
            this.setState({errorVisibility: "visible",
                errorText: "Name may not be empty"});
            setTimeout(() => {
                this.setState(() => ({errorVisibility: "hidden"}))
            }, 3000);

            return;
        }

        if (Date.parse(this.state.startTime) > Date.parse(this.state.endTime))
        {
            this.setState({errorVisibility: "visible",
                errorText: "Start time may not be bigger than end time"});
            setTimeout(() => {
                this.setState(() => ({errorVisibility: "hidden"}))
            }, 3000);
            return;
        }

        let task = JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            tags: this.state.tags,
        });

        console.log(task);

        fetch(`http://localhost:8080/task/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: task
        })
            .then(response => response.json())
            .then (data => {
                this.props.history.push("/index");
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
                        <form>
                            <Box id="errorField" visibility={this.state.errorVisibility}>
                                <Alert severity="error">
                                    {this.state.errorText}
                                </Alert>
                            </Box>
                            <div className={classes.section}>
                                <TextField className={classes.section} name="name" id="TaskName" label="Name" defaultValue={this.state.name} onChange={this.handleChange} /><br/>
                                <TextField className={classes.section} name="description" id="TaskDescription" label="Description" fullWidth multiline rows={4} variant="outlined" defaultValue={this.state.description} onChange={this.handleChange} />
                            </div>

                            <div className={classes.section}>
                                <InputLabel shrink>
                                    Tags
                                </InputLabel>
                                <Select
                                    value={this.state.availableTags[0]}
                                    onChange={this.addTag}
                                >
                                    {this.state.availableTags.map(tag => (
                                        <MenuItem key={tag.id} value={tag}>{tag.name}</MenuItem>
                                    ))}
                                </Select>

                                {this.state.tags.map(tag => (
                                    <Input disabled
                                           key={tag.id}
                                            type={"text"}
                                            value={tag.name}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.removeTag.bind(this, tag)}
                                                >
                                                    <CancelIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                ))}
                            </div>

                            <div className={classes.section}>
                                <TextField className={classes.section} name="startTime" id="StartTime" label="Start time" type="datetime-local" defaultValue={this.state.startTime} onChange={this.handleChange}/><br/>
                                <TextField className={classes.section} name="endTime" id="EndTime" label="End time" type="datetime-local" defaultValue={this.state.endTime} onChange={this.handleChange}/>
                            </div>

                            <Button className={classes.section} id="Save" onClick={this.handleSubmit} color="primary" variant="contained">Save</Button>
                        </form>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

export default withRouter(withStyles(useStyles)(TaskInput));
