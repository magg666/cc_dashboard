import React from "react";
import {makeStyles} from "@material-ui/core";
import {Card} from "react-bootstrap";


const styles = makeStyles({
    title: {
        textAlign: "center",
    },
    text: {
        fontSize: "20px"
    }
});

/**
 * Functional component with instruction about adding projects data
 * @returns {*}
 * @constructor
 */
export default function WelcomePart() {
    const classes = styles();

    return <React.Fragment>
        <div className={classes.title}>
            <h3>Welcome CodeCooler</h3>
        </div>
        <Card.Body className={classes.text}>
            <p>Create repository on Github. Copy link to your repository - it should look like this:</p>
            <p>https://github.com/YOUR GITHUB LOGIN/YOUR PROJECT TITLE</p>
            <p>Create plan. Use Trello, Google Spreadsheet or other online tool.</p>
            <p>Send information through form below. Refresh page to see your data.</p>
        </Card.Body>
    </React.Fragment>

}