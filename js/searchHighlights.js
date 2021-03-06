import React, {Component} from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import {
    HashRouter,
    BrowserRouter,
    Route,
    Switch,
    NavLink,
} from 'react-router-dom';
import {Footer} from '../js/footer';
import logo from '../src/img/logo.png';

const URL = 'https://www.scorebat.com/video-api/v1/';

export class SearchHighlights extends Component {
    state = {
        value: '',
        error: false,
        listOfHighlights: [],
        listOfLeagues: [],
        leagueBufferList: [],
        match: '',
        matches: []
    };

    componentDidMount() {
        this.searchLeagues();
        this.searchHighlights();
    }

    setValue = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    resetPage = () => {
        this.setState({
            match: []
        })
    }

    searchHighlights = () => {
        this.setState({
            listOfHighlights: []
        });

        fetch(URL)
            .then((response) => response.json())
            .then(data => {
                const names = data.map((item)=> item.competition.name);

                const unique = names.reduce((p, c) => {
                    return { ...p, [c]: true };
                }, {});
                // console.log('eee', Object.keys(unique));
                this.setState({
                    listOfHighlights: data,
                    leagueBufferList: Object.keys(unique).sort()
                });
            })
            .catch((msg) => {
                console.log(msg);
                this.setState({
                    error: true
                })
            });
        if(this.state.listOfHighlights){
            console.log(this.state.listOfHighlights);
        }
    };

    searchLeagues = () => {
        this.setState({
            listOfLeagues: [],
            leagueBufferList:[]
        });

        fetch(URL)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    listOfLeagues: data
                });
            })
            .catch((msg) => {
                console.log(msg);
                this.setState({
                    error: true
                })
            });
    };

    showMatches = (item) => {
        if(this.state.match==item) {
            this.setState({
                match: []
            });
        } else {
            this.setState({
                match: item
            });
        }
    };

    scrollToTop = () => {
        scroll.scrollToTop();
    };

    render() {
        // if(this.state.listOfLeagues.length) {
        //     console.log('3', this.state.listOfLeagues[0].competition.name);
        //     console.log(this.state.leagueBufferList);
        // }
        return(
            <>
                <a className="logo" href={`#`}><img style={{"marginBottom": 20, "width": 400}} alt="logo" src={logo} onClick={this.resetPage} /></a>
                <div className="container">
                    <div className="leagues">
                        <h2 style={{"width": "100%", "marginBottom": 20}}>Nations/Leagues</h2>
                        {this.state.leagueBufferList.map((item, index)=>{
                            return (
                                <Link activeClass="active" to="listOfMatches" key={index} className={`league-btn ${item==this.state.match && "clicked"}`} href={`#`}  onClick={e =>this.showMatches(item)}  >{item}</Link>
                            )
                        })}
                    </div>
                    <div className="listOfMatches" id="scrollDest" >
                        {this.state.listOfHighlights.filter((item)=>item.competition.name==this.state.match).map((item, index)=>{
                            return (
                                <a key={item.index} className="match" href={`#/match_details/${item.title}`} target="_blank">
                                    <p className="match-name">{item.title}</p>
                                    <img alt={item.title} className='thumbnail' src={item.thumbnail} />
                                </a>
                            )
                        })}
                    </div>
                    <Link className="slideToTopBtn" activeClass="active" to="leagues"  >Go To Leagues</Link>
                </div>
                <Footer />
            </>
        )
    }
}