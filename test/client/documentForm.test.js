import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import DocumentForm from '../../client/src/components/document/documentForm.jsx';

const mockStore = configureMockStore([thunk]);

const setup = (saving) => {
  const store = mockStore(document);
  const props = {
    document: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {},
    store
  };
  return mount(<DocumentForm {...props} />);
};
describe('the document form is rendering', () => {
  it('renders h1 and the form', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h4').text()).toEqual('Manage Document');
  });
});
