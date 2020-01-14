import React, {Component} from "react";
import axios from "axios";
import {validate} from "./Validations";
import {Button, Card, Form} from "react-bootstrap";
import {withStyles} from "@material-ui/core";
import {Message, ErrorMessages} from "../Messages/Messages";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/**
 * Styles for ProjectForm
 * @param theme
 * @returns styles
 */
const formStyles = theme => ({
    label: {
        fontSize: "20px"
    }

});

/**
 * Component handling form for adding data about projects
 */
class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getUrl: "",
            getPlan: "",
            getModule: "",
            failure: false,
            msg: null,
            errors: {
                url: [],
                plan: [],
                module: []
            }

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postProjectData = this.postProjectData.bind(this);
    }

    cleanForm = () => {
        this.setState({getUrl: "", getPlan: "", getModule: ""})
    }

    confirmSubmit = () => {
        this.props.shouldRefresh(true)
    };

    async postProjectData() {
        axios.post(process.env.REACT_APP_PROJECTS, {
                "url": this.state.getUrl,
                "plan": this.state.getPlan,
                "module": this.state.getModule,
            },
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        )
            .then(r => {
                if (r.status === 200 || r.status === 201) {
                    this.setState({failure: false});
                    this.setState({msg: null});
                } else if (r.status === 206) {
                    this.setState({failure: true});
                    this.setState({msg: "Your data was incorrect."})
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({failure: true});
                this.setState({msg: "Error occurred. Please report to Maciek mentor."})
            })
    }

    handleChange(event) {
        const target = event.target;
        let name = target.name;
        this.setState({[name]: target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {getUrl, getPlan, getModule} = this.state;
        const newErrors = {...this.state.errors};

        [newErrors.url, newErrors.plan, newErrors.module] = validate(getUrl, getPlan, getModule);

        this.setState({errors: newErrors});
        if (newErrors.url.length === 0 &&
            newErrors.plan.length === 0 &&
            newErrors.module.length === 0) {
            this.confirmSubmit();
            this.setState({getUrl: ""});
            this.postProjectData()
                .then(this.cleanForm)
                .catch(er => console.log(er))

        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    this.state.serverError &&
                    <Card>
                        <Card.Subtitle>
                            <Message msg={this.state.msg}/>
                        </Card.Subtitle>
                    </Card>
                }
                <Form.Group>
                    <Form.Label className={classes.label}>Repository link</Form.Label>
                    <Form.Control name="getUrl"
                                  type="text"
                                  value={this.state.getUrl}
                                  placeholder="https://github.com/YOUR GITHUB LOGIN/YOUR PROJECT TITLE"
                                  onChange={this.handleChange} required/>
                    <ErrorMessages errors={this.state.errors.url}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={classes.label}>Plan link</Form.Label>
                    <Form.Control name="getPlan"
                                  type="text"
                                  value={this.state.getPlan}
                                  placeholder="Link to your plan e.g. https://trello.com/YOUR_PLAN"
                                  onChange={this.handleChange} required/>
                    <ErrorMessages errors={this.state.errors.plan}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={classes.label}>Module</Form.Label>
                    <Form.Control name="getModule"
                                  as="select"
                                  value={this.state.getModule}
                                  onChange={this.handleChange}>
                        <option value={""}>Select module</option>
                        <option value={"PB"}>ProgBasic</option>
                        <option value={"WEB"}>Web & SQL</option>
                        <option value={"OOP"}>OOP</option>
                        <option value={"ADV"}>Advanced</option>
                    </Form.Control>
                    <ErrorMessages errors={this.state.errors.module} required/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        )
    }
}

export default withStyles(formStyles)(ProjectForm)


