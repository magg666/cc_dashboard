import React, {Component} from "react";
import {withStyles} from "@material-ui/core";

import {Captions} from "./Captions";
import {formatTime} from "../utils";

/**
 * Function to style clock component
 * @param theme
 * @returns css properties
 * */
const clockStyles = theme => ({
    clockContainer: {
        width: "100%",
        backgroundColor: "black",
        height: "10%",
        position: "fixed",
        bottom: "0"
    },
    clockWrapper: {
        height: "100%",
        width: "100%",
        display: "inline-block",
    },
    leftContainer: {
        float: "left",
        height: "100%",
        display: "flex"
    },
    rightContainer: {
        float: "right",
        height: "100%",
        display: "flex"
    },
    dayText: {
        fontSize: "1.6em",
        color: "#e5e406",
        marginLeft: "20px",
        alignSelf: "center"
    },
    timeText: {
        fontSize: "2em",
        color: "#e5e406",
        marginLeft: "20px",
    },
    captionText: {
        fontSize: "1.4em",
        color: "#e5e406",
        marginRight: "20px",
        alignSelf: "center"

    },

});

/**
 * Clock component with day name, time and captions with time (HH:MM) remaining to define event
 * with help :  https://tutorialscapital.com/
 *              react-native-create-live-digital-clock-using-
 *              local-system-time-android-ios-tutorial/
 */

class Clock extends Component {
    constructor(props) {
        super(props);
        /**
         * initial state of clock
         *
         * @type {{currentTime: string,
         * hour: *,
         * currentDay: null,
         * daysArray: *[],
         * minutes: *,
         * caption: string}}
         */
        this.state = {

            hour: new Date().getHours(),
            minutes: new Date().getMinutes(),
            currentDay: null,
            daysArray: ['SUNDAY', 'OH NO, MONDAY', 'ENGLISH DAY', "ODIN'S DAY", "THOR'S DAY", 'DEMO DAY', 'YAY, SATURDAY'],
            caption: "",
            currentTime: ""
        };
    }

    /**
     * Get current local time and sets state accordingly
     */
    getCurrentTime() {
        this.setState({hour: new Date().getHours()});
        this.setState({minutes: new Date().getMinutes()});

        //returns time in human-readable format
        this.setState({currentTime: formatTime(this.state.hour, this.state.minutes, new Date().getSeconds())});

        // assigns day name from array to day number from Date
        // eslint-disable-next-line array-callback-return
        this.state.daysArray.map((item, index) => {
            if (index === new Date().getDay()) {
                this.setState({currentDay: item.toUpperCase()});
            }
        })
    }

    /**
     * set state for appropriate caption
     */
    getCaption() {
        this.setState({caption: new Captions(this.state.hour, this.state.minutes).getCurrentCaption()})
    }

    /**
     * On mounting component sets timer interval to refresh page by 1 second and by that simulate clock ticking
     */
    componentDidMount() {
        this.timer = setInterval(() => {
            this.getCurrentTime();
            this.getCaption()
        }, 1000)
    }

    /**
     * Before un-mounting timer is cleared
     */
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**
     * Renders html for clock
     * @returns {*}
     */
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.clockContainer}>
                <div className={classes.clockWrapper}>
                    <div className={classes.leftContainer}>
                        <span className={classes.dayText}>{this.state.currentDay} <span
                            className={classes.timeText}>{this.state.currentTime}</span></span>
                    </div>
                    <div className={classes.rightContainer}>
                        <span className={classes.captionText}>{this.state.caption}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(clockStyles)(Clock)
