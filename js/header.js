import React, {Component} from 'react';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import logo from '../src/img/logo.png';

export class Header extends Component {
    render () {
        return (
            <div className="header">
                <a href={`#`}><img src={logo} /></a>
            </div>
        )
    };
}