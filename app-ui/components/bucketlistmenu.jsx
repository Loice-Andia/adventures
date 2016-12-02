import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap';
import { Link } from 'react-router';
import CreateItemModal from './createitem.jsx';
import EditBucketlistModal from './editbucketlist.jsx';
import DeleteBucketlistModal from './deletebucketlist.jsx';


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
              <EditBucketlistModal active="edit-bucketlist" bucketlist_id={this.props.bucketlist_id} name={this.props.name} description={this.props.description}>Edit Bucketlist </EditBucketlistModal>
            </li>
            <li >
              <DeleteBucketlistModal active="delete-bucketlist" bucketlist_id={this.props.bucketlist_id}> Delete Bucketlist </DeleteBucketlistModal>
            </li>
            <li >
              <CreateItemModal active="create-item" bucketlist_id={this.props.bucketlist_id}> Create Item </CreateItemModal>
            </li>
            <li>
              <Link to="/logout">LogOut</Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}