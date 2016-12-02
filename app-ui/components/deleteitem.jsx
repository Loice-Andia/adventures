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
import DeleteItemForm from './deleteitemform.jsx';


class DeleteItemModal extends Component {
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
        <Button onClick={this.open} role="delete_item" className={this.props.type}>
          {this.props.children}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close} className="signin-modal">
          <Modal.Body>
            <Tab.Container id="delete_item" defaultActiveKey={this.props.active}>
              <DeleteItemForm bucketlist_id={this.props.bucketlist_id} item_id={this.props.item_id}/>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default DeleteItemModal;
