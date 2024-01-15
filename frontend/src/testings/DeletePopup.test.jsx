import React from 'react'
import { shallow } from 'enzyme'
import DeletePopup from '../components/DeletePopup'
import { DialogTitle, DialogContentText, Button } from '@mui/material'

describe('<DeletePopup>', () => {
  const setListingId = jest.fn();
  const setListings = jest.fn();
  const setOpenDelete = jest.fn();
  const listingName = 'listingName';
  it('should render a DeletePopup with two buttons', () => {
    const wrapper = shallow(<DeletePopup openDelete={false} setOpenDelete={setOpenDelete} listingName={listingName} listingId={'123'} setListingId={setListingId} setListings={setListings}/>);
    expect(wrapper.find(DialogTitle).text()).toBe('Delete listing: ' + listingName);
    expect(wrapper.find(DialogContentText).text()).toBe('Are you sure you want to delete this listing?');
    expect(wrapper.find(Button)).toHaveLength(2);
  })
  it('button Back functions well', () => {
    const wrapper = shallow(<DeletePopup openDelete={false} setOpenDelete={setOpenDelete} listingName={listingName} listingId={'123'} setListingId={setListingId} setListings={setListings}/>);
    expect(wrapper.find(Button).at(0).text()).toBe('Back');
    wrapper.find(Button).at(0).simulate('click');
    expect(setOpenDelete).toHaveBeenCalledTimes(1);
  })
  it('button Delete functions well', () => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    const wrapper = shallow(<DeletePopup openDelete={false} setOpenDelete={setOpenDelete} listingName={listingName} listingId={'123'} setListingId={setListingId} setListings={setListings} listings={[]}/>);
    expect(wrapper.find(Button).at(1).text()).toBe('Delete');
    expect(wrapper.find(Button).at(1).props().sx.color).toBe('red');
    wrapper.find(Button).at(1).simulate('click');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
})
