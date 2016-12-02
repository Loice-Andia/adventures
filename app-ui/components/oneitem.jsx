import { Link } from 'react-router';
import React, { Component } from 'react';
import request from 'superagent';
import {
  Nav,
  Navbar,
  MenuItem
} from 'react-bootstrap';
import ItemMenu from './itemmenu.jsx';

class OneItem extends Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {item:{}, bucketlist_id:0};
  }

componentWillMount() {
    const { params } = this.props;
    request
      .get(`/api/v1/bucketlists/${params.bucketlist_id}/items/${params.item_id}`)
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
            this.setState({item:result.body});
            this.setState({bucketlist_id:params.bucketlist_id});
          }
          else{
            let errorMessage = 'No items';
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
      <ItemMenu bucketlist_id={this.state.bucketlist_id}
       item_id={this.state.item.id} 
       name={this.state.item.name} 
       description={this.state.item.description} 
       completed={this.state.item.completed}/>
        <div className="bucketlists" >
        <br />
            
              <center><h2 style={{'text-transform': 'uppercase'}}> {this.state.item.name}</h2></center>
              <div className="items">
                <h5  style={{'color': '#647688'}}>Description:</h5>
                <div>{this.state.item.description}</div>
                <br />
                <h5  style={{'color': '#647688'}}>Date Created:</h5>
                {this.state.item.date_created}
                <h5  style={{'color': '#647688'}}>Date modified:</h5>
                {this.state.item.date_modified}
                <h5  style={{'color': '#647688'}}>Completion:</h5>
                {this.state.item.completed ? "DONE" : "PENDING" }
        <br />
      </div>
      </div>
      <br />
      <br />
      </div>
    )
  }
}

export default OneItem;