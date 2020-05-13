import React, { Component } from 'react';
import { Card, Button, CardText, Input, Label } from 'reactstrap';

export class login extends Component {
    constructor(props) {
        this.state = {
            username: null,
            password: null
        };
        this.login = this.login.bind(this);
    }

    handleInputChange(event) {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    login() {
        this.
    }

    render() {
        return (
            <div>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <Label for='username'>Username</Label>
                    <Input type='text' id='username' name='username' onChange={this.handleInputChange} />
                    <br/>
                    <Label for='username'>Password</Label>
                    <Input type='password' id='password' name='password' onChange={this.handleInputChange} />
                    <hr />
                    <Button color='info'>Login</Button>
                </Card>
            </div>
        );
    }
}