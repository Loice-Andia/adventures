import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap';
import { Link } from 'react-router';
import CreateItemModal from './createitem.jsx'

export default class BucketlistMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar className="static-nav">
      <Navbar.Header>
          <Navbar.Toggle/>
          <p style={{"color": 'orange', "marginTop": '30%'}}> ADVENTURES</p>
        </Navbar.Header>
      <Navbar.Collapse>
          <Nav pullRight>
            <li >
              <Link to="/bucketlists">All Bucketlists</Link>
            </li>
            <li >
              <Link to="#">Edit Bucketlist</Link>
            </li>
            <li >
              <Link to="#">Delete Bucketlist</Link>
            </li>
            <li >
              <CreateItemModal active="create-item" bucketlist_id={this.props.bucketlist_id}>Create Item</CreateItemModal>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}