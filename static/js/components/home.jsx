import React, {Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

export default class Home extends Component {
constructor(props){
    super(props);
    this.state = {
      showLogin: false
    }
  }
  onStickyStateChange(isSticky) {
    this.setState({ showLogin: isSticky})
  }
  render() {
    return (
      <div style={{"background": '#fff'}}>
          <StickyContainer>
            <Sticky onStickyStateChange={this.onStickyStateChange.bind(this)}>
            </Sticky>
          </StickyContainer>
      </div>
    );
  }
}