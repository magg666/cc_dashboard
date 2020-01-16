import React, {Component} from 'react';
import axios from 'axios'
import BarChart from "./ColumnBar";
import {Title} from "../Title/Title";

/**
 * Component ColumnBar adapted to display data about repositories statistic
 */
export default class ColumnBarWithData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.loadData = this.loadData.bind(this)
    }

    // load data on mounting
    componentDidMount() {
        this.timer = setInterval(() => {
            this.loadData()
                .catch(err => console.log(err)
                );
        },60000);

    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    async loadData() {
        const promise = await axios.get(process.env.REACT_APP_TOTAL);
        const status = promise.status;
        if (status === 200) {
            const data = promise.data;
            this.setState({data: data})
        }
    }

    getStats(array, statsType) {
        let projectsStats = [];
        array.projects.map(pr => {
            return pr['total'].map(stat => {
                return projectsStats.push(stat[statsType])
            })
        });
        return projectsStats
    }

    render() {
        return (
            <React.Fragment>
                <Title title={"TOTAL SUMMARY"}/>
                {this.state.data.map((obj, bIndex) => {
                    if (obj['projects'].length !== 0) {

                        // get list of projects titles
                        let projectsTitles = [];
                        obj.projects.map(pr => {
                            return projectsTitles.push(pr['project'])
                        });

                        let commits = this.getStats(obj, 'commits');
                        let additions = this.getStats(obj, 'additions');
                        let deletions = this.getStats(obj, 'deletions');

                        return (
                            <BarChart key={bIndex * 5} projectsTitles={projectsTitles} commits={commits}
                                      additions={additions} deletions={deletions} title={obj.module}/>
                        )
                    }
                    return null
                })}</React.Fragment>

        )
    }

}

