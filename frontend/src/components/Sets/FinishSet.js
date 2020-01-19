import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";

import {StyledWeatherClockPage, StyledCelebration, StyledCalendar} from "./Sets";
import axios from "axios";
import {StyledColumnBar} from "../ColumnBar/ColumnBar";

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
export const FinishSet = () => {
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
    async function getGithubTotalData() {
        const promise = await axios.get(process.env.REACT_APP_TOTAL);
        const status = promise.status;
        if (status === 200) {
            const githubData = promise.data;
            setData(githubData)
        }
    }

    function getStats(array, statsType) {
        let projectsStats = [];
        array.projects.map(pr => {
            return pr['total'].map(stat => {
                return projectsStats.push(stat[statsType])
            })
        });
        return projectsStats
    }

    useEffect(() => {
        getGithubTotalData().catch(err => console.log(err));
        const interval = setInterval(() => {
            getGithubTotalData().catch(err => console.log(err))
        }, 60000);
        return () => clearInterval(interval);
    }, []);


    return (
        <Carousel interval={15000} activeIndex={index} direction={direction} onSelect={handleSelect} indicators={false}
                  fade={true} pauseOnHover={false}>
            <Carousel.Item>
                <StyledWeatherClockPage backgroundColor={'black'}/>
            </Carousel.Item>
            {
                data.map((obj, bIndex) => {
                    if (obj['projects'].length !== 0) {

                        // get list of projects titles
                        let projectsTitles = [];
                        obj.projects.map(pr => {
                            return projectsTitles.push(pr['project'])
                        });

                        let commits = getStats(obj, 'commits');
                        let additions = getStats(obj, 'additions');
                        let deletions = getStats(obj, 'deletions');

                        return (
                            <Carousel.Item key={bIndex}>
                                <StyledColumnBar key={bIndex * 5} projectsTitles={projectsTitles} commits={commits}
                                                 additions={additions} deletions={deletions} title={obj.module}
                                                 backgroundColor={'black'}/>
                            </Carousel.Item>
                        )
                    }
                    return null
                })
            }
            <Carousel.Item>
                <StyledCalendar title={"CODECOOL EVENTS"} backgroundColor={'black'}
                                url={process.env.REACT_APP_CALENDAR_EVENTS}/>
            </Carousel.Item>
            <Carousel.Item>
                <StyledCelebration backgroundColor={'black'}
                                   url={process.env.REACT_APP_CELEBRATIONS}/>
            </Carousel.Item>
        </Carousel>
    )
};


