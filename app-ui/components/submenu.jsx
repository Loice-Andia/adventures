import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap';
import { Link } from 'react-router';
import CreateBucketlistModal from './createbucketlist.jsx'

export default class SubMenu extends Component {
  constructor() {
    super();
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
            <li>
              <CreateBucketlistModal>Create Bucketlist</CreateBucketlistModal>
            </li>
            <li>
              <Link to="#">LogOut</Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}