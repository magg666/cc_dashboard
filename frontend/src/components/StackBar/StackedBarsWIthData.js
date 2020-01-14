import React, {Component} from 'react';
import axios from 'axios'
import {StackedBars} from "./StackedBars";
import {Title} from "../Title/Title";

/**
 * Component StackBar adapted to display data about repositories statistic
 */
export default class StackBarWithData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.loadData = this.loadData.bind(this)
    }

    // load data on mounting
    componentDidMount() {
        this.loadData().catch(
            err => console.log(err)
        );
    }

    async loadData() {
        const promise = await axios.get(process.env.REACT_APP_WEEK);
        const status = promise.status;
        if (status === 200) {
            const data = promise.data;
            this.setState({data: data})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Title title={"PIONEERS OF THE WEEK"}/>
                {this.state.data.map((obj, bIndex) => {
                    return obj.projects.length > 0 ?
                        (
                            <StackedBars key={bIndex * 5} data={obj.projects}/>
                        ) : null
                })}


            </React.Fragment>
        )
    }
}