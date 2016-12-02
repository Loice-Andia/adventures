import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap';
import { Link } from 'react-router';
import EditItemModal from './edititem.jsx';
import DeleteItemModal from './deleteitem.jsx';


export default class ItemMenu extends Component {
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
              <Link to="/bucketlists">Bucketlist</Link>
            </li>
            <li >
              <EditItemModal active="edit-item" bucketlist_id={this.props.bucketlist_id} item_id={this.props.item_id} name={this.props.name} description={this.props.description} completed={this.props.completed}>Edit Item </EditItemModal>
            </li>
            <li >
              <DeleteItemModal active="delete-item" bucketlist_id={this.props.bucketlist_id} item_id={this.props.item_id}> Delete Item </DeleteItemModal>
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