import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Search } from '../../client/src/components/document/search.jsx';


describe('Search document component', () => {
  const props = {
    actions: {
      searchDocument: () => Promise.resolve()
    },
    params: {},
  };

  it('renders doc div', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('renders input component', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });
});
