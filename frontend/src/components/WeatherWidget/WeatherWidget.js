import React from "react";
import {Card} from "@material-ui/core";
import {withStyles} from "@material-ui/core";

import {fetchWeatherData, filterWeatherData, formatWeatherData} from "./WeatherWidget_container";
import {WeatherHeader, WeatherMain, WeatherBottom} from "./WeatherWidget_elements";

import './css/weather-icons-wind.min.css'
import './css/weather-icons.min.css'

/**
 * Styles weather widget
 * @param theme
 * @returns
 */
const weatherStyles = theme => ({
    card: {
        backgroundColor: "black",
        color: "white",
        maxWidth: "70%",
        border: "2px solid white",
        borderRadius: "15px",
        margin: "auto"
    },
    line: {
        margin: "0",
        border: "0",
        borderTop: "1px solid white",
    }
});

/**
 * Weather Widget for Warsaw
 */
class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDayWeather: {
                time: null,
                temperature: null,
                summary: "",
                icon: "",
                humidity: null,
                pressure: null,
                windSpeed: null,
            }
        }
    }


    // Method for getting weather data
    getCurrentWeather() {
        let myKeys = Object.keys(this.state.currentDayWeather);
        fetchWeatherData()
            .then(res => {
                let filtered = filterWeatherData(res["currently"], myKeys);
                let formatted = formatWeatherData(filtered);
                this.setState({currentDayWeather: formatted})
            })
    }

    // checks weather on mounting
    componentDidMount() {
        this.getCurrentWeather();
        this.timer = setInterval(() => {
            this.getCurrentWeather();
        }, 60000)

    }

    // clears interval on un-mounting
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <WeatherHeader time={this.state.currentDayWeather.time}/>
                <hr className={classes.line}/>
                <WeatherMain temperature={this.state.currentDayWeather.temperature}
                             summary={this.state.currentDayWeather.summary}
                             icon={this.state.currentDayWeather.icon}/>
                <hr className={classes.line}/>
                <WeatherBottom humidity={this.state.currentDayWeather.humidity}
                               windSpeed={this.state.currentDayWeather.windSpeed}
                               pressure={this.state.currentDayWeather.pressure}/>
            </Card>
        )
    }
}
export default withStyles(weatherStyles)(WeatherWidget)




