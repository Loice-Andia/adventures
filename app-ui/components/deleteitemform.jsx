import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  Form,
  Alert
} from 'react-bootstrap';
import request from 'superagent';

class DeleteItemForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBucketlist = this.deleteBucketlist.bind(this);
    this.state = {
      message: '',
      messageType: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.deleteBucketlist();
  }

  deleteBucketlist() {
    console.log(this);
    let params = this.props;
    request
      .delete(`/api/v1/bucketlists/${params.bucketlist_id}/items/${params.item_id}`)
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .end((err, result) => {
        if(err || !result.ok){
          let errorMessage = 'Error occured';
          this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
        } else {
            this.setState({
              message: 'Deleted successfully',
              messageType: 'success'
            });
            window.location.href = `/onebucketlist/${params.bucketlist_id}`
        }
      });
  }

  render() {
    return  (
      <Form onSubmit={this.handleSubmit}>
        {this.state.message ?
          <Alert bsStyle={this.state.messageType}>
           {this.state.message}
          </Alert> : null}
          Are you sure you want to remove this?
        <Button type="submit" block className="login-btn">
          Delete
        </Button>
      </Form>
    );
  }
}

export default DeleteItemForm;
