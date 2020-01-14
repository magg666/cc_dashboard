import React from "react";
import {makeStyles} from "@material-ui/core";

const styles = makeStyles({
    msg: {
        fontSize: "20px",
        textAlign: "center",
        padding: "20px"

    }
});

export const Message = (props) => {
    const classes = styles();
    return (
        <div className={classes.msg}>
            <span>{props.msg}</span>
        </div>
    )
};

const errorStyles = makeStyles({
    errors: {
        fontSize: "14px",
        color: "#CB4B46"
    }
});

export const ErrorMessages = (props) => {
    const classes = errorStyles();
    return props.errors.map((value, index) =>
        <p className={classes.errors} key={index}>
            {value}
        </p>)
};