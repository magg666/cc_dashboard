import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import StarIcon from '@material-ui/icons/Star';
import {Title} from "../Title/Title";
import {ListGroup} from "react-bootstrap";
import {makeStyles} from "@material-ui/core";

/**
 * Styles for celebration screen
 * @type
 */
const celebrationStyles = makeStyles({
    icon1: {
        color: "green"
    },
    icon2: {
        color: 'yellow'
    },
    icon3: {
        color: "blue"
    },
    icon4: {
        color: "red"
    },
    list: {
        fontSize: '24px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px'
    },
    noList: {
        textAlign: 'center',
        color: 'white',
        padding: '20px'
    },
    item: {
        backgroundColor: 'black',
        letterSpacing: '3px'
    }
})

/**
 * Component to display data about passed exams
 * @returns {*}
 * @constructor
 */
export const Celebration = () => {
    // initial state
    let [students, setStudents] = useState([]);


    useEffect(() => {
        const interval = setInterval(() => {
            const fetchData = async () => {
                const result = await axios(process.env.REACT_APP_CELEBRANTS);
                setStudents(result.data);
            };
            fetchData().catch(err => console.log(err));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    let celebrationOptions = ((value, index) => {
        if (value['exam'] === 'PA') {
            return (
                <ListGroup.Item className={classes.item} key={index}><ThumbUpIcon
                    className={classes.icon1}/> {value["first_name"] + " " + value["last_name"]} passed {value["exam"]} on {value['pass_date']}
                </ListGroup.Item>
            )
        } else if (value['exam'] === 'GO') {
            return (
                <ListGroup.Item className={classes.item} key={index}><EmojiEmotionsIcon
                    className={classes.icon2}/> {value["first_name"] + " " + value["last_name"]} got {value["exam"]} status
                    on {value['pass_date']}
                </ListGroup.Item>

            )
        } else if (value['exam'] === 'TRIAL') {
            return (
                <ListGroup.Item className={classes.item} key={index}><EmojiEventsIcon
                    className={classes.icon3}/> {value["first_name"] + " " + value["last_name"]} passed
                    through {value["exam"]} on {value['pass_date']}
                </ListGroup.Item>

            )
        } else {
            return (
                <ListGroup.Item className={classes.item} key={index}><StarIcon
                    className={classes.icon4}/> {value["first_name"] + " " + value["last_name"]} got
                    a {value["exam"]} on {value['pass_date']}
                </ListGroup.Item>

            )
        }
    });

    const classes = celebrationStyles();
    if (students.length > 0) {
        return <React.Fragment>
            <Title title={"THIS WEEK SUCCESSES"}/>
            <ListGroup className={classes.list}>
                {students.map((value, index) => {
                    return celebrationOptions(value, index)
                })}
            </ListGroup>
        </React.Fragment>
    } else {
        return <React.Fragment>
            <Title title={"YOU ARE AWESOME!"}/>
            <h2 className={classes.noList}>Even the smallest of jobs well done will take you one step closer
                towards the success that you have dreamed about.</h2>
            <h2 className={classes.noList}> Keep it up.</h2>
        </React.Fragment>
    }


};

