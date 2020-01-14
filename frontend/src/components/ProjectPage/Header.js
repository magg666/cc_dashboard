import React from "react";
import {makeStyles} from "@material-ui/core";
import logo from '../../codecool-logo.png'


const styles = makeStyles({
    header: {
        padding: "0 30px",
    },
    logo: {
        width: "60px",
        padding: '10px'
    },
    title: {
        fontSize: "24px",
        fontWeight: "600",
        lineHeight: '60px',
        margin: "0",
        padding: '0 6px',
        color: "white"
    }

});
/**
 * Header for projects page
 * @returns {*}
 * @constructor
 */
export default function Header() {
    const classes = styles();
    return <div className={classes.header}>
        <img className={classes.logo} src={logo} alt="Codecool Logo"/>
        <span className={classes.title}>Codecool Dashboard</span>
    </div>
}