import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";

import {StyledWeatherClockPage, StyledCalendar} from "./Sets";
import {StyledGithubWeeklyChart} from "../StackBar/StackedBars";
import axios from "axios";

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
    let [data, setData] = useState([]);
    /**
     * Handles moving the Carousel
     * @param selectedIndex
     * @param e
     */
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    /**
     * Fetch data about projects and set state
     * @returns {Promise<void>}
     */
    async function getGithubWeekData() {
        const promise = await axios.get(process.env.REACT_APP_WEEK);
        const status = promise.status;
        if (status === 200) {
            const githubData = promise.data;
            setData(githubData)
        }
    }

    useEffect(() => {
        getGithubWeekData().catch(err => console.log(err));
        const interval = setInterval(() => {
            getGithubWeekData().catch(err => console.log(err))
        }, 60000);
        return () => clearInterval(interval);
    }, []);


    return (
        <Carousel interval={15000} activeIndex={index} direction={direction} onSelect={handleSelect} indicators={false}
                  fade={true} pauseOnHover={false}>
            <Carousel.Item>
                <StyledWeatherClockPage backgroundColor={'black'}/>
            </Carousel.Item>

            {data.map((obj, bIndex) => {
                return obj.projects.length > 0 ?
                    (<Carousel.Item>
                        <StyledGithubWeeklyChart key={bIndex * 5} data={obj.projects} title={obj.module}
                                                 backgroundColor={'black'}/>
                    </Carousel.Item>)
                    : null
            })}

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


