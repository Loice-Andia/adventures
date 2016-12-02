import React, { Component } from 'react';

class Logout extends Component {
  constructor() {
    super();
      sessionStorage.removeItem('accessToken');
      window.location.href = '/';
    };
  }
export default Logout;