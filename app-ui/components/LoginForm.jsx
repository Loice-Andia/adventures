
import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  Form
} from 'react-bootstrap';
import request from 'superagent';
import Cookies from 'js-cookie';
import cookie from 'react-cookie'

class LoginForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      username: '',
      password: '',
      token: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.loginUser(this.state.username, this.state.password);
  }

  handleFieldChange(event) {
    event.preventDefault();
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value,
    });
  }

  loginUser(username, password) {
    request
      .post('/api/v1/login/')
      .type('form')
      .set('X-CSRFToken', Cookies.get('csrftoken'))
      .send({ username, password })
      .end((err, response) => {
        sessionStorage.accessToken = response.body.token;
        console.log(sessionStorage.accessToken)
        window.location.href = '/bucketlists';
      });
  }
  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormGroup >
          <FormControl.Feedback>
            <i className="mdi mdi-account"></i>
          </FormControl.Feedback>
          <FormControl type="text"
                       placeholder="Username"
                       name="username"
                       onChange={this.handleFieldChange}
          />
        </FormGroup>
        <FormGroup >
          <FormControl.Feedback>
            <i className="mdi mdi-lock"></i>
          </FormControl.Feedback>
          <FormControl type="password"
                       placeholder="Password"
                       name="password"
                       onChange={this.handleFieldChange}
          />
        </FormGroup>
        <Checkbox>Remember me</Checkbox>
        <Button type="submit" block className="login-btn">
          Login
        </Button>
      </Form>
    )
  }
}

export default LoginForm;
