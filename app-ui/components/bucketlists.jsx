import { Link } from 'react-router';
import React, { Component } from 'react';
import request from 'superagent';
import {
  Nav,
  Navbar,
  MenuItem
} from 'react-bootstrap';
import CreateBucketlistModal from './createbucketlist.jsx';
import SubMenu from './submenu.jsx';

class Bucketlists extends Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {bucketlists:[]};
}
componentWillMount() {
    request
      .get('/api/v1/bucketlists.json/')
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .end((err, result) => {
        if(err || !result.ok){
          let errorMessage = 'Error occured';
          this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
        } else {
          if((result.body).length){
            console.log(result.body)
            this.setState({bucketlists: result.body
              });
          }
          else{
            let errorMessage = 'No bucketlists';
            this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
          }
        }
      });
  };

handleFieldChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <div >
      <SubMenu />
        <div className="bucketlists" >
        <br />
        <center><h1> BUCKETLISTS</h1></center>
        <br />
        {this.state.bucketlists.map((value, index) =>{
          return (
            
              <div key={value.id} className="items">
              <h4><Link to={`/onebucketlist/${value.id}`} style={{'text-transform': 'uppercase'}}>{value.name}</Link></h4>
              <hr />
                <p className="or-divider"><span>Date Created : {value.date_created}</span></p>
                <h5  style={{'color': '#647688'}}>Description:</h5>
                <div style={{'padding-left': '70px'}}> {value.description}</div>
                
              </div>
              
            )
        })}
        <br />
        </div>
      </div>
    )
  }
}

export default Bucketlists;