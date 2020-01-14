import React from "react";

import styledPaper from "../StyledPaper/StyledPaper";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import Clock from "../Clock/Clock";
import Calendar from "../Calendar/Calendar";
import StackedBarsWIthData from "../StackBar/StackedBarsWIthData";
import {Celebration} from "../Celebrations/Celebriations";
import ColumnBarWithData from "../ColumnBar/ColumnBarWithData";


/**
 * Groups weather and clock components
 * @returns {*}
 * @constructor
 */
function WeatherClockPage() {
    return (
        <React.Fragment>
            <WeatherWidget/>
            <Clock/>
        </React.Fragment>
    )
}

// styled components
export const StyledWeatherClockPage = styledPaper(WeatherClockPage);
export const StyledCalendar = styledPaper(Calendar);
export const StyledGithubWeeklyChart = styledPaper(StackedBarsWIthData);
export const StyledGithubTotalChart = styledPaper(ColumnBarWithData);
export const StyledCelebration = styledPaper(Celebration);
