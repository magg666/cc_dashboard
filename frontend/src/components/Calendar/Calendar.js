import React, {Component} from "react";
import axios from "axios";
import {withStyles} from "@material-ui/core";
import Table from 'react-bootstrap/Table'

import {formatCalendarDate, adjustMessageToEvent, formatShortTime} from "../utils"
import {Title} from "../Title/Title";

/**
 * Styling Calendar component
 * @param theme
 * @returns
 */
const calendarStyles = theme => ({
    rows: {
        fontSize: "1.3rem",
        color: "white"
    },
    cell1: {
        width: "20%"
    },
    cell2: {
        width: "20%"
    },
    cell3: {
        width: "20%"
    },
    cell4: {
        width: "40%"
    },
});

/**
 * Component Calendar to display Google calendar data.
 *
 * @param props:
 * @returns {*}
 * @constructor
 */
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
        this.loadEvents = this.loadEvents.bind(this)
    }

    // load data on mounting
    componentDidMount() {
        this.loadEvents().catch(err => console.log(err));
        this.timer = setInterval(() => {
            this.loadEvents()
                .catch(err => console.log(err)
            );
        }, 60000)

    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**
     * Asynchronous function to fetch data from server
     * @returns {Promise<void>}
     */
    async loadEvents() {
        const promise = await axios.get(this.props.url);
        const status = promise.status;
        if (status === 200) {
            const data = promise.data;
            this.setState({events: data})
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Title title={this.props.title}/>
                <Table responsive borderless>
                    <tbody>
                    {this.state.events.map((value, index) => {
                        if (value['all_day'] === true) {
                            return <tr key={index} className={classes.rows}>
                                <td className={classes.cell1}>{formatCalendarDate(new Date(value['start']))} </td>
                                <td className={classes.cell2}>{adjustMessageToEvent(value['start'])} </td>
                                <td className={classes.cell3}>All day</td>
                                <td className={classes.cell4}>{value['summary']}</td>
                            </tr>
                        } else {
                            return <tr key={index} className={classes.rows}>
                                <td className={classes.cell1}>{formatCalendarDate(value['start'])} </td>
                                <td className={classes.cell2}>{adjustMessageToEvent(value['start'])} </td>
                                <td className={classes.cell3}>{formatShortTime(value['start'])} - {formatShortTime(value['end'])} </td>
                                <td className={classes.cell4}>{value['summary']}</td>
                            </tr>
                        }

                    })}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

export default withStyles(calendarStyles)(Calendar)