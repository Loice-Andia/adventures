import React, { Component } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Glyphicon,
  Button,
  FormControl,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import LoginModal from "./LoginModal.jsx";

export default class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false
    }
  }
  componentWillReceiveProps(props){
    this.setState({showLogin: props.showLogin})
  }
  render() {
    return (
      <Row className="submenu">
        <Col md={2}>
          <DropdownButton title="Bucketlists" id="bg-nested-dropdown">
            <MenuItem eventKey="1">Bucketlists</MenuItem>
          </DropdownButton>
        </Col>
        <Col md={8}>
          <form >
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
              <FormControl.Feedback>
                <Glyphicon glyph="search" />
              </FormControl.Feedback>
            </FormGroup>
          </form>
        </Col>
        <Col md={2}>
          { this.state.showLogin ? <LoginModal active="login">Login / Sigin Up </LoginModal> : null }
        </Col>
      </Row>
    )
  }
}