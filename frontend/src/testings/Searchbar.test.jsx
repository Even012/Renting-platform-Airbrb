import React from 'react'
import { shallow } from 'enzyme'
import SearchSection from '../components/Searchbar'
import { TextField, IconButton, Button } from '@mui/material'

describe('<SearchSection>', () => {
  const setListings = jest.fn()
  it('should render a searchfield, two iconbutton and a reset button', () => {
    const wrapper = shallow(<SearchSection listings={[]} setListings={ setListings }/>);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);
  })
  it('textfield functions well', () => {
    const wrapper = shallow(<SearchSection listings={[]} setListings={ setListings }/>);
    expect(wrapper.find(TextField).props().label).toBe('search title and city location');
    wrapper.find(TextField).simulate('change', { target: { value: 'house' } });
    wrapper.update();
    expect(wrapper.find(TextField).props().value).toBe('house');
  })
  it('filterIcon functions well', () => {
    const wrapper = shallow(<SearchSection listings={[]} setListings={ setListings }/>);
    expect(wrapper.find(IconButton).at(0).props()['aria-label']).toBe('filter');
  })
  it('SearchIcon functions well', () => {
    const wrapper = shallow(<SearchSection listings={[]} setListings={ setListings }/>);
    expect(wrapper.find(IconButton).at(1).props()['aria-label']).toBe('search');
    wrapper.find(IconButton).at(1).simulate('click');
    expect(setListings).toHaveBeenCalledTimes(1);
  })
  it('Reset functions well', () => {
    const wrapper = shallow(<SearchSection listings={[]} setListings={ setListings }/>);
    expect(wrapper.find(Button).text()).toBe('Reset');
    wrapper.find(Button).simulate('click');
    expect(setListings).toHaveBeenCalledTimes(1);
  })
})
