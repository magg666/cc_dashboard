import React from "react";
import {CardContent, makeStyles} from "@material-ui/core";

// Styles weather widget's elements
const styles = makeStyles({
    left: {
        float: 'left',
        color: 'white',
        display: "table-cell",
        verticalAlign: "middle",
    },
    right: {
        float: 'right',
        color: 'white',
        display: "table-cell",
        verticalAlign: "middle",
    },
    cardContent: {
        padding: "20px",
        height: "100%",
        display: "table",
        width: "100%",
    },
    temperature: {
        fontSize: "50px",
        textAlign: "center",
        letterSpacing: "5px"
    },
    summary: {
        textAlign: "center",
        fontSize: "40px"
    },
    extraWeather: {
        display: "table-cell",
        verticalAlign: "middle",
        maxWidth: "0",
        textAlign: "center",
        fontSize: "20px"
    }
});

/**
 * Renders header for weatherWidget. Displays date and town (town is hardcoded)
 * @param props
 * @returns {*}
 * @constructor
 */
export function WeatherHeader(props) {
    const classes = styles();
    return (
        <CardContent className={classes.cardContent}>
            <h3 className={classes.left}>{props.time}</h3>
            <h3 className={classes.right}>Warsaw</h3>
        </CardContent>
    )
}

/**
 * Renders main weather panel. Displays icon, temperature, summary
 * @param props
 * @returns {*}
 * @constructor
 */
export function WeatherMain(props) {
    const classes = styles();
    return (
        <CardContent className={classes.cardContent}>
            <p className={classes.temperature}><i className={`wi wi-${props.icon}`}/>      {props.temperature}<i
                className="wi wi-celsius units"/></p>
            <p className={classes.summary}> {props.summary}</p>
        </CardContent>
    )
}

/**
 * Renders bottom panel of weather widget. Displays humidity, wind speed, pressure
 * @param props
 * @returns {*}
 * @constructor
 */
export function WeatherBottom(props) {
    const classes = styles();
    return (
        <CardContent className={classes.cardContent}>
            <div className={classes.extraWeather}>
                <i className="wi wi-humidity"/><br/>
                <span id="humidity">{props.humidity}</span>%
            </div>
            <div className={classes.extraWeather}>
                <i className="wi wi-small-craft-advisory"/><br/>
                <span id="wind">{props.windSpeed}</span>m/s
            </div>
            <div className={classes.extraWeather}>
                <i className="wi wi-barometer"/> <br/>
                <span id="pressure">{props.pressure}</span>hPa
            </div>
        </CardContent>
    )
}

