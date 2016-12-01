// Main entry point for react components
import {render} from 'react-dom';
import {browserHistory, IndexRoute, Router, Route} from 'react-router';
import React from 'react';
import Main from './main.jsx';
import Bucketlists from './bucketlists.jsx'
import OneBucketlist from './onebucketlist.jsx'

function hashLinkScroll() {
  const {hash} = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated, this is
    // required when navigating from a different page so that the element is
    // rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      history.pushState("", document.title, window.location.pathname +
                                            window.location.search);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }, 0);
  }
}


const routes = (
  <Router history={browserHistory} onUpdate={hashLinkScroll}>
    <Route path="/" component={Main}/>
   	<Route path="bucketlists" component={Bucketlists}/>
    <Route path="onebucketlist/:bucketlist_id" component={OneBucketlist}/> 
  </Router>
);

render(routes, document.getElementById('react'));
