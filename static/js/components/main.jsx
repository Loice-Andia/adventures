import {render} from 'react-dom';
import React, {Component} from 'react';
import Menu from './menu.jsx';

export default class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{"background-image": "url("../images/intro.jpg")"}} >
        <Menu/> {this.props.children}
        <div className="intro-text">
      Have any ideas of what you 
      would like to do in your lifetime.
      Get Started with 
      <p style={{"color": 'orange'}}>ADVENTURES. </p>
      </div>
      </div>
    )
  }
}