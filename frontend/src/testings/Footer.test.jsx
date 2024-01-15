import React from 'react'
import { shallow } from 'enzyme'
import Copyright from '../components/Footer'
import { Typography } from '@mui/material'

describe('<Footer>', () => {
  it('should render a footer', () => {
    const wrapper = shallow(<Copyright />);
    const text = wrapper.find(Typography);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(text.text()).toBe('Copyright © airbrb 2023.');
  })
})
