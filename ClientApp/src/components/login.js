import React, { Component } from 'react';
import { Card, Button, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
//var fs = require('fs');

export class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            success: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    async handleInputChange(event) {
        let { name, value } = event.target;
        await this.setState({
            [name]: value
        });
        console.log("input:\n", this.state);
    }

    login(event) {
        //event.preventDefault();
        //fs.readFileSync('.env', 'utf8', (err, data) => {
        //    if (err) {
        //        console.log("err:\n", err);
        //    } else {
        //        console.log(data);
        //    }
        //});
        //console.log("pw:\n", pw);
        if (this.state.username === 'varunmaster' && this.state.password === "") {
            localStorage.setItem('isLoggedIn', 1);
            this.setState({
                success: true
            });
        } else {
            this.setState({
                success: false
            });
        }
    }

    render() {
        return (
            this.state.success === false ?
                <div>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <Label for='username'>Username</Label>
                        <Input type='text' id='username' name='username' onChange={this.handleInputChange} />
                        <br />
                        <Label for='username'>Password</Label>
                        <Input type='password' id='password' name='password' onChange={this.handleInputChange} />
                        <hr />
                        <Button color='info' onClick={this.login}>Login</Button>
                    </Card>
                </div>
                :
                <Redirect to='/services' />
        );
    }
}
