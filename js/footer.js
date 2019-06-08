import React, {Component} from 'react';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import overhead from '../src/img/overhead.png';


export class Footer extends Component {
    render () {
        return (
            <div className="footer">
                <div className="footer-content">
                    <img src={overhead} />
                    <p className="copy">Copyright &copy; {new Date().getFullYear()} Wojciech Masicz</p>
                </div>
            </div>
        )
    };
}