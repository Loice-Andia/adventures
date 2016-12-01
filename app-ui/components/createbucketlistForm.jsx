import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Alert
} from 'react-bootstrap';
import request from 'superagent';

class CreateBucketlistForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBucketlist = this.createBucketlist.bind(this);
    this.state = {
      name: '',
      description: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createBucketlist(this.state.name, this.state.description);
  }

  createBucketlist(name, description) {
    request
      .post('/api/v1/bucketlists/')
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .send({'name': name, 'description': description})
      .end((err, result) => {
        if(err || !result.ok){
          let errorMessage = 'Error occured';
          if(result.body.name){
            errorMessage = result.body.name[0];
          } else if(result.body[0]) {
              errorMessage = result.body[0];
          }
          this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
        } else {
            this.setState({
              message: 'Bucketlist successfully added',
              messageType: 'success',
              name: '',
              description: ''
            });
            window.location.href = '/bucketlists';
        }
      });
  }

  render() {
    return  (
      <Form onSubmit={this.handleSubmit}>
        {this.state.message ?
          <Alert bsStyle={this.state.messageType}>
           {this.state.message}
          </Alert> : null
        }
        <FormGroup >
          <FormControl.Feedback>
          </FormControl.Feedback>
          <FormControl type="text"
                       placeholder="Name"
                       name="name"
                       value={this.state.name}
                       onChange={function (event) {
                             event.preventDefault();
                             let key = event.target.name;
                             let value = event.target.value;
                             this.setState({
                               [key]: value
                             });
                             }.bind(this)
                            }
          />
        </FormGroup>
        <FormGroup >
          <FormControl.Feedback>
          </FormControl.Feedback>
          <FormControl type="text"
                       placeholder="Description"
                       name="description"
                       value={this.state.description}
                       onChange={function (event) {
                             event.preventDefault();
                             let key = event.target.name;
                             let value = event.target.value;
                             this.setState({
                               [key]: value
                             });
                             }.bind(this)
                            }
          />
        </FormGroup>
        <Button type="submit" block className="login-btn">
          Create Bucketlist
        </Button>
      </Form>
    );
  }
}

export default CreateBucketlistForm;
