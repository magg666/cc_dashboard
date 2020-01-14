import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ProjectPage from "./components/ProjectPage/ProjectPage";
import {StartSet} from "./components/Sets/StartSet";
import {MiddleSet} from "./components/Sets/MiddleSet";
import {FinishSet} from "./components/Sets/FinishSet";


class App extends Component {
    state = {width: 0, height: 0};
    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        let day = new Date().getDay();
        if (day === 1) {
            return <Router>
                <Route exact path="/index" component={StartSet}/>
                <Route exact path="/" component={ProjectPage}/>
            </Router>
        } else if (day === 5) {
            return <Router>
                <Route exact path="/index" component={FinishSet}/>
                <Route exact path="/" component={ProjectPage}/>
            </Router>
        }
        return (
            <Router>
                <Route exact path="/index" component={MiddleSet}/>
                <Route exact path="/" component={ProjectPage}/>
            </Router>
        )
    }
}

export default App;
