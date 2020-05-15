import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './services.css';
import Axios from 'axios';
import { Button } from 'reactstrap';

export class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: parseInt(localStorage.getItem('isLoggedIn')),
            piHoleStatus: null,
            teleStatus: null,
            plexStatus: null,
            mailStatus: null
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.KillTelegraf = this.KillTelegraf.bind(this);
        this.startTelegraf = this.startTelegraf.bind(this);
    }

    componentDidMount() {
        this.getPiHoleStatus();
        //this.getMailStatus();
        this.getPlexStatus();
        this.getTeleStatus();
    }

    getPiHoleStatus() {
        Axios({
            url: "/services/status/pihole/" + this.state.loggedIn,
            method: "POST"
        }).then((res) => {
            return this.setState({
                piHoleStatus: res.data.status
            });
        });
    }

    getPlexStatus() {
        Axios({
            url: "/services/status/plex/" + this.state.loggedIn,
            method: "POST"
        }).then((res) => {
            return this.setState({
                plexStatus: res.data.status
            });
        });
    }

    getTeleStatus() {
        Axios({
            url: "/services/status/telegraf/" + this.state.loggedIn,
            method: "POST"
        }).then((res) => {
            return this.setState({
                teleStatus: res.data.status
            });
        });
    }

    getMailStatus() {
        Axios({
            url: "/services/status/mail/" + this.state.loggedIn,
            method: "POST"
        }).then((res) => {
            return this.setState({
                mailStatus: res.data.status
            });
        });
    }

    KillTelegraf() {
        Axios({
            url: "/ignition/kill/killTelegraf/" + this.state.loggedIn,
            method: "POST"
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    }

    startTelegraf() {
        Axios({
            url: "/ignition/start/startTelegraf/" + this.state.loggedIn,
            method: "POST"
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    }

    render() {
        //console.log("state:\n", this.state);
        return (
            this.state.loggedIn === 1 ?
                <div className='center'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Plex</th>
                                {this.state.plexStatus === "running" ? <td>Running</td> : <td>{this.state.plexStatus}</td>}
                                <td><Button color="success" disabled={this.state.plexStatus === 'running' ? true : false}>Start</Button> &nbsp; &nbsp; &nbsp;<Button color="danger" disabled={this.state.plexStatus !== 'running' ? true : false}>Stop</Button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                {this.state.mailStatus === "running" ? <td>Running</td> : <td>{this.state.mailStatus}</td>}
                                <td><Button color="success" disabled={this.state.mailStatus === 'running' ? true : false}>Start</Button> &nbsp; &nbsp; &nbsp;<Button color="danger" disabled={this.state.mailStatus !== 'running' ? true : false}>Stop</Button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Grafana</th>
                                {this.state.teleStatus === "running" ? <td>Running</td> : <td>{this.state.teleStatus}</td>}
                                <td><Button color="success" disabled={this.state.teleStatus === 'running' ? true : false} onClick={this.startTelegraf} > Start</Button> &nbsp; &nbsp; &nbsp;<Button color="danger" disabled={this.state.teleStatus !== 'running' ? true : false} onClick={this.KillTelegraf}>Stop</Button></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>PiHole</th>
                                {this.state.piHoleStatus === "running" ? <td>Running</td> : <td>{this.state.piHoleStatus}</td>}
                                {/*<td><Button color="success" disabled={this.state.piHoleStatus === 'running' ? true : false}>Start</Button> &nbsp; &nbsp; &nbsp;<Button color="danger" disabled={this.state.piHoleStatus !== 'running' ? true : false}>Stop</Button></td>*/}
                            </tr>
                        </tbody>
                    </table>
                </div>
                : <Redirect to='/' />
        );
    }
}
