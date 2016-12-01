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
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';


class LoginModal extends Component {
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
        <Button onClick={this.open} role="login" className={this.props.type}>
          {this.props.children}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close} className="signin-modal">
          <Modal.Body>
            <Tab.Container id="login-tab" defaultActiveKey={this.props.active}>
              <Tab.Content animation>
                <Tab.Pane eventKey="login">
                  <h4 >Login</h4>
                  <LoginForm />
                </Tab.Pane>

                <Tab.Pane eventKey="signup">
                  <h4 >Sign Up</h4>
                  <RegisterForm />
                </Tab.Pane>
                <Nav >
                  <NavItem eventKey="signup">
                    <span className="tab-nav-text">Don't have an account? </span>
                    Sign Up
                  </NavItem>
                  <NavItem eventKey="login">
                    <span className="tab-nav-text">Already have an account? </span>
                    Login
                  </NavItem>
                </Nav>
              </Tab.Content>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
