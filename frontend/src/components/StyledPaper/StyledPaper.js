import React from "react";
import {Paper, withStyles} from "@material-ui/core";

/**
 * Material Ui Paper component with possibility to add custom background color
 * @param Component
 * @returns HOC Paper component
 * */
const styledPaper = Component => {
    const styledPaper = ({ classes, ...props }) => (
        <Paper className={classes.root}>
            <Component {...props} />
        </Paper>
    );

    const styles = theme => ({
        root: {
            backgroundColor: props => props.backgroundColor,
            height: window.innerHeight,
            paddingTop: "5%"
        }
    });

    return withStyles(styles)(styledPaper);
};

export default styledPaper;