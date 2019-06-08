import React, {Component} from 'react';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import {Footer} from '../js/footer';
import logo from '../src/img/logo.png';

const URL = 'https://www.scorebat.com/video-api/v1/';

export class Details extends Component {
    state = {
        matchInfo:null,
        videos: ''
    };

    componentDidMount() {
        this.matchInfo();
    }

    matchInfo = () => {
        this.setState({
            matchName: this.props.match.params.name,
            error:false,
        });

        fetch(URL)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    matchInfo: data.find(x=>{
                        return x.title===this.props.match.params.name
                    })
                });
            })
            .catch((msg) => {
                console.log(msg);
                this.setState({
                    error: true
                })
            });
    };

    render() {
        if(this.state.matchInfo===null) {
            return null;
        }
        console.log(this.props.match.params.name);
        console.log(this.state.matchInfo);
        console.log(this.state.matchInfo.videos);
        return(
            <>
                <div className="container">
                    <a href={`#`}><img style={{"width":200}} alt="logo" src={logo} /></a>
                    <div className="match-info">
                        <h1 className="match-info-title">{this.props.match.params.name}</h1>
                        <p className="match-info-date" style={{"fontWeight": "bold"}}>{new Date(this.state.matchInfo.date).toLocaleDateString()}</p>
                        <p className="league-name" style={{"marginBottom":10}} >League: {this.state.matchInfo.competition.name}</p>
                        <a className="league-details-btn" href={this.state.matchInfo.competition.url} target='_blank'> Visit scorebat.com for {this.state.matchInfo.competition.name} details</a>
                    </div>
                    <div className="highlights">
                        {
                            this.state.matchInfo.videos.map((item, index)=>(
                                <div key={index} className="highlight">
                                    <h3 className="highlight-title">{item.title}</h3>
                                    {console.log(item.embed)}
                                    <div className="video" dangerouslySetInnerHTML={{ __html: `${item.embed}`}}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}