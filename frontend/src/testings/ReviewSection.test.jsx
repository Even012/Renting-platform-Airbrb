import React from 'react'
import ReviewSection from '../components/ReviewSection'
import { shallow } from 'enzyme'
import { Button, CardContent } from '@mui/material'

global.alert = jest.fn();
describe('ReviewSection', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ReviewSection listingId="123" bookingId="456" />);
    expect(wrapper.find(CardContent).text()).toBe('Leave your review here');
    expect(wrapper.find({ name: 'rating' })).toHaveLength(1);
    expect(wrapper.find({ label: 'Review' })).toHaveLength(1);
    expect(wrapper.find(Button).text()).toBe('Submit');
  });

  it('updates rating and review text', () => {
    const wrapper = shallow(<ReviewSection listingId="123" bookingId="456" />);

    const rating = wrapper.find({ name: 'rating' });
    rating.simulate('change', {}, 1);
    expect(wrapper.find({ name: 'rating' }).props().value).toEqual(1);

    const reviewTextField = wrapper.find({ label: 'Review' });
    reviewTextField.simulate('change', { target: { value: 'Great!' } });
    wrapper.update();
    expect(wrapper.find({ label: 'Review' }).props().value).toBe('Great!');
  });
  it('submits review on button click', () => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
    const wrapper = shallow(<ReviewSection listingId="1" bookingId="1" />);
    wrapper.find(Button).simulate('click');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
