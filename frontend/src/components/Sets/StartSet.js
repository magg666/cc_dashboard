import React, {useState} from "react";
import Carousel from "react-bootstrap/Carousel";

import {StyledCalendar, StyledWeatherClockPage} from "./Sets";


/**
 * Component groups elements for start of week to display.
 * Renders:
 * 1. Weather plus clock
 * 2. Calendar events info
 * 3. Calendar consultation info
 *
 * @returns {*}
 * @constructor
 */
export const StartSet = () => {

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
                  fade={true} pauseOnHover={false}>
            <Carousel.Item>
                <StyledWeatherClockPage backgroundColor={'black'}/>
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