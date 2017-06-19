import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageDocumentPage } from '../components/document/manageDocumentPage.jsx';

describe('Manage Document Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      actions: { updateDocument: () => Promise.resolve() },
      document: { id: '', name: '', content: '', category: '' }
    };

    const wrapper = mount(<ManageDocumentPage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.name).toBe('Title must be at least 5 characters.');
  });
});
