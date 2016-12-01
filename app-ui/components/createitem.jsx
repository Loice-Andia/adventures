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
import CreateItemForm from './createitemform.jsx'


class CreateItemModal extends Component {
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
        <Button onClick={this.open} role="create_item" className={this.props.type}>
          {this.props.children}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close} className="signin-modal">
          <Modal.Body>
            <h4 >New Item</h4>
            <Tab.Container id="create_item" defaultActiveKey={this.props.active}>
              <CreateItemForm bucketlist_id={this.props.bucketlist_id}/>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CreateItemModal;
