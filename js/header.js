import React, {Component} from 'react';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

export class Header extends Component {
    render () {
        return (
            <div className="header">
                <a href={`#`}><img src="../src/img/logo.png" /></a>
            </div>
        )
    };
}