import expect from 'expect';

import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentForm from '../../client/src/components/document/documentForm.jsx';

const setup = (saving) => {
  const props = {
    document: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}

  };
  return shallow(<DocumentForm {...props} />);
};

describe('the document form is rendering', () => {
  it('renders h1 and the form', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Document');
  });
  it('save button is labelled save when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });
  it('save button is labelling "Save..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
