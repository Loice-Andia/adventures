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
import DeleteBucketlistForm from './deletebucketlistform.jsx';


class DeleteBucketlistModal extends Component {
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
        <Button onClick={this.open} role="delete_bucketlist" className={this.props.type}>
          {this.props.children}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close} className="signin-modal">
          <Modal.Body>
            <Tab.Container id="delete_bucketlist" defaultActiveKey={this.props.active}>
              <DeleteBucketlistForm bucketlist_id={this.props.bucketlist_id}/>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default DeleteBucketlistModal;
