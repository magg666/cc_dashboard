import React, {useState} from "react";
import Carousel from "react-bootstrap/Carousel";

import {StyledWeatherClockPage, StyledGithubWeeklyChart, StyledCalendar} from "./Sets";

/**
 * Component groups elements for middle of week to display.
 * Renders:
 * 1. GitHub Weekly Statistic
 * 2. Weather plus clock
 * 3. Calendar events info
 * 4. Calendar consultation info
 *
 * @returns {*}
 * @constructor
 */
export const MiddleSet = () => {
    // this are states for carousel
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    /**
     * Handles moving the Carousel
     * @param selectedIndex
     * @param e
     */
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };


    return (
        <Carousel interval={15000} activeIndex={index} direction={direction} onSelect={handleSelect} indicators={false}
                  fade={true} pauseOnHover={false} controls={false}>
            <Carousel.Item>
                <StyledWeatherClockPage backgroundColor={'black'}/>
            </Carousel.Item>
            <Carousel.Item>
                <StyledGithubWeeklyChart backgroundColor={'black'}/>
            </Carousel.Item>
            <Carousel.Item>
                <StyledCalendar title={"CODECOOL EVENTS"} backgroundColor={'black'}
                                url={process.env.REACT_APP_CALENDAR_EVENTS}/>
            </Carousel.Item>
            <Carousel.Item>
                <StyledCalendar title={"CODECOOL CONSULTATIONS"} backgroundColor={'black'}
                                url={process.env.REACT_APP_CALENDAR_CONSULTATION}/>

            </Carousel.Item>
        </Carousel>
    )
};


