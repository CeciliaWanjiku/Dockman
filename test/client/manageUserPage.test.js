import React from 'react';
import expect from 'expect';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import ManageUserPage from '../../client/src/components/user/manageUserPage.jsx';
// import configureStore from '../../client/src/store/configureStore';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('Manage User Page', () => {
  it.only('sets error message when trying to save empty name', () => {
    const store = mockStore([]);
    const props = {
      actions: { updateUser: () => Promise.resolve() },
      users: [{ id: '', name: 'kim', email: '', password: '' }],
      user: { id: '', name: 'kim', email: '', password: '' },
    };
    const wrapper = mount(<Provider store={store}><ManageUserPage /></Provider>);
    wrapper.setProps(props);
    const saveButton = wrapper.find('input');
    console.log('Is input rendered:', saveButton);
    // expect(saveButton.prop('type')).toBe('submit');
    // console.log('State:', wrapper.state());
    wrapper.setState(props);
    saveButton.simulate('click');
    console.log('>>>>>>>>>', wrapper.state());
    expect(wrapper.state().errors.name).toBe('Name should be longer than 5 characters!!');
  });
});
