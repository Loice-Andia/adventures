import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  Form,
  Link,
  Modal,
  Col,
  Nav,
  NavItem,
  Tab
} from 'react-bootstrap';
import CreateBucketlistForm from './createbucketlistForm.jsx'


class CreateBucketlistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div>
        <Button onClick={this.open} role="create_bucketlist" className={this.props.type}>
          {this.props.children}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close} className="signin-modal">
          <Modal.Body>
            <h4 >New Bucketlist</h4>
            <Tab.Container id="create_bucketlist" defaultActiveKey={this.props.active}>
              <CreateBucketlistForm />
            </Tab.Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CreateBucketlistModal;
