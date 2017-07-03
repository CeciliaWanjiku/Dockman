import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
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
  //return shallow(<Provider store={store}><DocumentForm {...props} /></Provider>);
  return mount(<DocumentForm {...props} />);
};
describe('the document form is rendering', () => {
  it('renders h1 and the form', () => {
    const wrapper = setup(false);
    //console.log('ESTON:', wrapper.find('form'));
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Document');
  });
  // it('save button is labelled save when not saving', () => {
  //   const wrapper = setup(false);
  //   expect(wrapper.find('input').props().value).toBe('Save');
  // });
  // it('save button is labelling "Save..." when saving', () => {
  //   const wrapper = setup(true);
  //   expect(wrapper.find('input').props().value).toBe('Saving...');
  // });
});
