import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class AddRestaurantForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            title: '',
            description: '',
            drinks: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (title, description, drinks) => event => {
        this.setState({
            [title]: event.target.value,
            [description]: event.target.value,
            [drinks]: event.target.value,
        });
    };


    handleSubmit = (event, data) => {
        const userId = this.props.userProfile.id;
        const token = sessionStorage.getItem('jwtToken');
        axios({
            method: 'post',
            url: `http://localhost:8080/addRestaurant/${userId}`,
            headers: { 'Authorization': "bearer " + token },
            data: {
                title: this.state.title,
                description: this.state.description,
                drinks: this.state.drinks,
            }
        }).then((response) => {
            this.props.handleCreation();
            console.log(response.data);

        }).catch((err) => {
            console.log(err.response);
            // this.setState({
            //     responseMessage: err.response.data.message,
            // });
        })
        event.preventDefault();
    };

    render() {
        console.log(this.state);
        const { classes } = this.props;
        if (this.props.creationStepCount === 0) {
            return (
                <div>
                    <h1>What's the name of the restaurant?</h1>
                    <form id='creation-form' noValidate autoComplete='off' onSubmit={this.handleSubmit}>
                        <TextField
                            id="title"
                            className={classes.textField}
                            placeholder="Title"
                            label="title"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                        />
                        <Button variant="contained" onClick={this.props.formStepComplete} color="primary">
                            Next
                        </Button>
                    </form>
                </div>
            )
        } else if (this.props.creationStepCount === 1) {
            return (
                <div>
                    <h1>What did you like about the restaurant?</h1>
                    <form id='creation-form' noValidate autoComplete='off' onSubmit={this.handleSubmit}>
                        <TextField
                            id="description"
                            className={classes.textField}
                            placeholder="Description"
                            label="description"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />
                        <Button variant="contained" onClick={this.props.formStepComplete} color="primary">
                            Next
                        </Button>
                        <Button variant="contained" onClick={this.props.formStepBack} color="primary">
                            Back
                        </Button>
                    </form>
                </div>
            )
        } else if (this.props.creationStepCount === 2) {
            return (
                <div>
                    <h1>What drinks did you like?</h1>
                    <form id='creation-form' noValidate autoComplete='off' onSubmit={this.handleSubmit}>
                        <TextField
                            id="drinks"
                            className={classes.textField}
                            placeholder="Drinks"
                            label="Drinks"
                            value={this.state.drinks}
                            onChange={this.handleChange('drinks')}
                            margin="normal"
                        />
                        <Button variant="contained" onClick={this.props.formStepComplete} color="primary">
                            Next
                        </Button>
                        <Button variant="contained" onClick={this.props.formStepBack} color="primary">
                            Back
                        </Button>
                    </form>
                </div>
            )
        } else if (this.props.creationStepCount === 3) {
            return (
                <div>
                    <h1>Does this look right?</h1>
                    <h2>{this.state.title}</h2>
                    <h2>{this.state.description}</h2>
                    <h2>{this.state.drinks}</h2>
                    <Button variant="contained" onClick={this.handleSubmit} color="primary">
                        Add Restaurant
                    </Button>
                    <Button variant="contained" onClick={this.props.formStepBack} color="primary">
                        Back
                    </Button>
                </div>
            )
        }
    }
}

export default withStyles(styles)(AddRestaurantForm);

