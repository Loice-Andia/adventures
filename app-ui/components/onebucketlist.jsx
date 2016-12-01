import { Link } from 'react-router';
import React, { Component } from 'react';
import request from 'superagent';
import {
  Nav,
  Navbar,
  MenuItem
} from 'react-bootstrap';
import CreateBucketlistModal from './createbucketlist.jsx';
import BucketlistMenu from './bucketlistmenu.jsx';

class OneBucketlist extends Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {bucketlist: {}, items:[]};
  }

componentWillMount() {
    const { params } = this.props;
    console.log("am here");
    request
      .get(`/api/v1/bucketlists/${params.bucketlist_id}/`)
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .end((err, result) => {
        console.log("result.body");
        if(err || !result.ok){
          let errorMessage = 'Error occured';
          this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
        } else {
          if(result.body.name){
            console.log(typeof(result.body.items));
            this.setState({bucketlist:result.body});
            this.setState({items:result.body.items});
          }
          else{
            console.log("am here");
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
      <BucketlistMenu bucketlist_id={this.state.bucketlist.id}/>
        <div className="bucketlists" >
        <br />
  
              <center><h2> {this.state.bucketlist.name}</h2></center>
                <p className="or-divider"><span>-</span></p>
                Description :
                <div>{this.state.bucketlist.description}</div>
                <br />
                <div> Date created :
                {this.state.bucketlist.date_created}</div>
                <div> Date modified :
                {this.state.bucketlist.date_modified}</div>
                <div>
                <h2> Items </h2>
                <table>
                  <thead>
                    <th> Name </th>
                    <th> Description </th>
                    <th> Completion </th>
                  </thead>
                <tbody>
                {this.state.items.map((value, index)=>{
                  return (
                    <tr key={index}>
                      <td>{value.name}</td>
                      <td> {value.description}</td>
                      <td> {value.completed ? "DONE" : "PENDING" }</td>
                    </tr>)
                })}
                </tbody>
                </table>
                </div>
        <br />
      </div>
      </div>
    )
  }
}

export default OneBucketlist;