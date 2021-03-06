import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function LoaderAnimation(props) {
    const { classes } = props;
    return (
        <div id="centerLoader" >
            <CircularProgress className={classes.progress} size={50} />
        </div>
    );
}

LoaderAnimation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoaderAnimation);