import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MenuContainer from "./components/MenuContainer";
import Home from "./components/Home";
import GitHubTool from "./components/GitHubTool";

function App() {
    return (
        <Router className="App">
            <header className="App-header">
                <MenuContainer>
                    <Route exact path="/" component={Home}/>
                    <Route path="/github" component={GitHubTool}/>
                </MenuContainer>
            </header>
        </Router>
    );
}

export default App;
