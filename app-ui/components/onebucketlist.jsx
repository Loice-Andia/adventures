import { Link } from 'react-router';
import React, { Component } from 'react';
import request from 'superagent';
import {
  Nav,
  Navbar,
  MenuItem
} from 'react-bootstrap';
import BucketlistMenu from './bucketlistmenu.jsx';

class OneBucketlist extends Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {bucketlist: {}, items:[]};
  }

componentWillMount() {
    const { params } = this.props;
    request
      .get(`/api/v1/bucketlists/${params.bucketlist_id}/`)
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .end((err, result) => {
        if(err || !result.ok){
          let errorMessage = 'Error occured';
          this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
        } else {
          if(result.body.name){
            this.setState({bucketlist:result.body});
            this.setState({items:result.body.items});
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
      <BucketlistMenu bucketlist_id={this.state.bucketlist.id} name={this.state.bucketlist.name} description={this.state.bucketlist.description}/>
        <div className="bucketlists" >
        <br />
  
              <center><h2 style={{'text-transform': 'uppercase'}}> {this.state.bucketlist.name}</h2></center>
              <div className="items">
                <h5  style={{'color': '#647688'}}>Description:</h5>
                <div>{this.state.bucketlist.description}</div>
                <br />
                <h5  style={{'color': '#647688'}}>Date created :</h5>
                {this.state.bucketlist.date_created}
                <h5  style={{'color': '#647688'}}>Date modified :</h5>
                {this.state.bucketlist.date_modified}
                <div>
                <h2 style={{'color': '#647688'}}> Items </h2>
                <table style={{'border': '1px solid #647688'}}>
                  <thead style={{"background-color": '#eaf0f2', "color": 'grey'}}>
                    <th style={{'border': '1px solid #647688', 'padding': '8px'}}> Name </th>
                    <th style={{'border': '1px solid #647688', 'padding': '8px'}}> Description </th>
                    <th style={{'border': '1px solid #647688', 'padding': '8px'}}> Completion </th>
                  </thead>
                <tbody>
                {this.state.items.map((value, index)=>{
                  return (
                    <tr key={index}>
                      <td style={{'border': '1px solid #647688', 'padding': '8px'}}><Link to={`/onebucketlist/${this.state.bucketlist.id}/items/${value.id}`}>{value.name}</Link></td>
                      <td style={{'border': '1px solid #647688', 'padding': '8px'}}> {value.description}</td>
                      <td style={{'border': '1px solid #647688', 'padding': '8px'}}> {value.completed ? "DONE" : "PENDING" }</td>
                    </tr>)
                })}
                </tbody>
                </table>
                </div>
        <br />
        </div>
      </div>
      </div>
    )
  }
}

export default OneBucketlist;