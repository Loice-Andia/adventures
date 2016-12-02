import Main from './components/main.jsx';
import React from 'react';
const expect = require('expect');
import { shallow,mount,render } from 'enzyme';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

describe('<Main />', () => {
  const wrapper = shallow(<Main url="/"/>)
  it('contains login and signup button', () => {
    const button = wrapper.find('a[href="/"]')
    expect(button.text()).toEqual('Login/Sign Up')
    expect(button.props()['onClick']).toEqual('bound open()')
  });

})
