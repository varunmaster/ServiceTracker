import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './services.css';
import 'axios';
import Axios from 'axios';

export class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piHoleStatus: null,
            teleStatus: null,
            plexStatus: null,
            mailStatus: null
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.getPiHoleStatus();
    }

    getPiHoleStatus() {
        let piHoleStatus = Axios.get("/services/pihole");
        piHoleStatus = piHoleStatus.then(res => { return res.data.status });
        console.log(piHoleStatus);
        //Axios.get("/services/telegraf").then(res => { teleStatus = res.data.status });
        //Axios.get("/services/plex").then(res => { plexStatus = res.data.status });
        //Axios.get("/services/mail").then(res => { mailStatus = res.data.status });
    }

    render() {
        let boolLoggedIn = parseInt(localStorage.getItem('isLoggedIn'));
        console.log("state:\n", this.state);
        return (
            boolLoggedIn === 1 ?
                <div className='center'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Plex</th>
                                {this.state.plexStatus === "running" ? <td>Running</td> : <td>{this.state.plexStatus}</td>}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                {this.state.mailStatus === "running" ? <td>Running</td> : <td>{this.state.mailStatus}</td>}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Grafana</th>
                                {this.state.teleStatus === "running" ? <td>Running</td> : <td>{this.state.teleStatus}</td>}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>PiHole</th>
                                {this.state.piHoleStatus === "running" ? <td>Running</td> : <td>{this.state.piHoleStatus}</td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
                : <Redirect to='/' />
        );
    }
}
