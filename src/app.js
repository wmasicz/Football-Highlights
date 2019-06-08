import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {SearchHighlights} from '../js/searchHighlights';
import {Details} from '../js/matchDetails';
import './style.scss';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

document.addEventListener('DOMContentLoaded', ()=> {

    const URL = 'https://www.scorebat.com/video-api/v1/';

    class App extends Component {
        render () {
            return (
                <HashRouter>
                    <Route path="/" exact={true} component={SearchHighlights}/>
                    <Route path={`/match_details/:name`} component={Details}/>
                </HashRouter>
            )
        }
    }

    ReactDOM.render(
        <div>
            <App />
        </div>
        , document.querySelector('#app'))
});