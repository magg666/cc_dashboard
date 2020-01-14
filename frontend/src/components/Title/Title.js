import React from "react";
import {makeStyles} from "@material-ui/core";

/**
 * Simple title component
 * @returns {*}
 * @constructor
 */
const titleStyle = makeStyles({
    'text': {
        width: "100%",
        textAlign: 'center',
        fontWeight: 'bolder',
        color: "white",
        letterSpacing: "3px",
    }
});

export function Title(props) {
    const classes = titleStyle();
    return (
        <h2 className={classes.text}>{props.title}</h2>
    )
}