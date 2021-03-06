import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
    },
    centerMe: {
        textAlign: 'center',
    },
});


const DrinkReview = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List id="noPadding" component="nav">
                <ListItem onClick={() => { props.handleSelection('Amazing', props.drinkOrFoodType); props.handleStepComplete() }} button>
                    <ListItemText className={classes.centerMe} primary="Amazing" />
                </ListItem>
                <Divider light />
                <ListItem onClick={() => { props.handleSelection('Good', props.drinkOrFoodType); props.handleStepComplete() }} button>
                    <ListItemText className={classes.centerMe} primary="Good" />
                </ListItem>
                <Divider light />
                <ListItem onClick={() => { props.handleSelection('Decent', props.drinkOrFoodType); props.handleStepComplete() }} button>
                    <ListItemText className={classes.centerMe} primary="Decent" />
                </ListItem>
                <Divider light />
                <ListItem onClick={() => { props.handleSelection('Bad', props.drinkOrFoodType); props.handleStepComplete() }} button>
                    <ListItemText className={classes.centerMe} primary="Bad" />
                </ListItem>
                <Divider light />
                <ListItem onClick={() => { props.handleSelection('None', props.drinkOrFoodType); props.handleStepComplete() }} button>
                    <ListItemText className={classes.centerMe} primary="None" />
                </ListItem>
            </List>
        </div>
    );
}

DrinkReview.propTypes = {
    classes: PropTypes.object.isRequired,
    handleStepComplete: PropTypes.func.isRequired,
    drinkOrFoodType: PropTypes.string.isRequired,
    handleSelection: PropTypes.func.isRequired,
};

export default withStyles(styles)(DrinkReview);