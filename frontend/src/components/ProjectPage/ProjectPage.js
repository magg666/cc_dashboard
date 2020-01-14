import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Header from "./Header";
import WelcomePart from "./WelcomePart";
import ProjectList from "./ProjectList";
import {Card, Container} from "react-bootstrap";
import ProjectForm from "../Forms/ProjectForm";


const styles = theme => ({
    background: {
        position: "fixed",
        zIndex: "1",
        top: "0",
        left: "0",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        backgroundColor: "#edf3f7"
    },

    dark: {
        position: "relative",
        zIndex: "2",
        height: "200px",
        webkitTransform: "rotate(-1.5deg) scale(2)",
        transform: "rotate(-1.5deg) scale(2)",
        background: "#278bc4",
    },

    light: {
        zIndex: "1",
        height: "330px",
        webkitTransform: "rotate(1.5deg) scale(1.2)",
        transform: "rotate(1.5deg) scale(1.2)",
        background: "#4c97ca",
    },
    bodyWrapper: {
        position: "relative",
        zIndex: "10",
        paddingBottom: "30px",
        fontFamily: "Roboto sans-serif",

    },
    card: {
        marginBottom: "20px",
        padding: "24px",
        borderRadius: "6px",
        background: "#fff",
        border: "1px solid #CB4B46"
    },
});

/**
 * Component for handling all parts of projects page
 */
class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {refresh: false};
    }


    receiveSubmitConfirm = () => {
        this.setState({refresh: true})
    };

    receiveRefreshConfirm = () => {
        this.setState({refresh: false})
    };


    render() {
        const {classes} = this.props;
        return (<React.Fragment>
            <Container className={classes.bodyWrapper}>
                <Header/>
                <Card className={classes.card}>
                    <WelcomePart/>
                </Card>
                <Card className={classes.card}>
                    <ProjectForm shouldRefresh={this.receiveSubmitConfirm}/>
                </Card>
                <Card className={classes.card}>
                    <ProjectList refresh={this.state.refresh} confirmRefresh={this.receiveRefreshConfirm}/>
                </Card>
            </Container>
            <div className={classes.background}>
                <div className={classes.dark}/>
                <div className={classes.light}/>
            </div>
        </React.Fragment>)

    }
}

export default withStyles(styles)(ProjectPage)
