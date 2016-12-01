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

class CreateItemForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createItem = this.createItem.bind(this);
    this.state = {
      name: '',
      description: '',
      completed: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createItem(this.state.name, this.state.description, this.state.completed);
  }

  createItem(name, description, completed) {
    console.log(this);
    let params = this.props;
    request
      .post(`/api/v1/bucketlists/${params.bucketlist_id}/items/`)
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .send({'name': name, 'description': description, 'completed': completed})
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
              message: 'Item successfully added',
              messageType: 'success',
              name: '',
              description: ''
            });
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
        <FormGroup >
          <label>Completed
          <FormControl.Feedback>
          </FormControl.Feedback>
          <FormControl type="checkbox"
                       placeholder="completed"
                       name="completed"
                       checked={this.state.completed}
                       onChange={function (event) {
                             let key = event.target.name;
                             let value = event.target.checked;
                             this.setState({
                               [key]: value
                             });
                             }.bind(this)
                            }
          />
          </label>
        </FormGroup>
        <Button type="submit" block className="login-btn">
          Create Item
        </Button>
      </Form>
    );
  }
}

export default CreateItemForm;
