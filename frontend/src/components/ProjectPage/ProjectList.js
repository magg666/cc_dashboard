import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {Card} from "react-bootstrap";
import {TableBody} from "@material-ui/core";

import {Message} from "../Messages/Messages";

/**
 * Component to display information about projects
 */
export default class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            message: "The repository list is not available.",
            serverError: false,
        };
        this.loadProjects = this.loadProjects.bind(this);
    }

    defaultRefresh = () => {
        this.props.confirmRefresh(false)
    };

    async loadProjects() {
        const promise = await axios.get(process.env.REACT_APP_PROJECTS);
        const status = promise.status;
        if (status === 200) {
            const data = promise.data;
            this.setState({projects: data});
            this.setState({serverError: false})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.refresh === true) {
            this.loadProjects()
                .catch(err =>{
                    console.log(err);
                    this.setState({serverError: true})})
                .finally(this.defaultRefresh)
        }
    }

    componentDidMount() {
        this.loadProjects().catch(err => {
            console.log(err)
                this.setState({serverError: true})}
            )
        this.timer = setInterval(() => {
            this.loadProjects()
                .catch(err => {
                    console.log(err);
                    this.setState({serverError: true});
                })
        }, 60000)

    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <Card>
                {this.state.serverError &&
                <Card>
                    <Card.Subtitle>
                        <Message msg={this.state.message}/>
                    </Card.Subtitle>
                </Card>
                }
                <Card.Body>
                    <Table>
                        <TableBody>
                            {
                                this.state.projects.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value.project}</td>
                                        <td>{value.owner}</td>
                                        <td><a href={value.url}>repository</a></td>
                                        <td><a href={value.plan}>plan</a></td>
                                        <td>{value.module}</td>
                                    </tr>
                                })
                            }</TableBody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}