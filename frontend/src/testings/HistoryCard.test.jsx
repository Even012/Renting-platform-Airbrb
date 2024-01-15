import React from 'react'
import { shallow } from 'enzyme'
import HistoryCard from '../components/HistoryCard'
import { Typography } from '@mui/material'
import { convertDate } from '../helpers';

describe('<HistoryCard>', () => {
  const request = {
    owner: '1',
    status: 'pending',
    dateRange: ['1', '2'],
    totalPrice: '800'
  }
  it('should render a Histroy Card', () => {
    const wrapper = shallow(<HistoryCard key={'1'} request={request} requestHistory={'requestHistory'} setRequestHistory={() => jest.fn()}/>);
    expect(wrapper.find(Typography)).toHaveLength(5);
    expect(wrapper.find(Typography).at(0).text()).toBe(request.status);
    expect(wrapper.find(Typography).at(1).text()).toBe('Guest Email: ' + request.owner);
    expect(wrapper.find(Typography).at(2).text()).toBe('Check-In: ' + convertDate(request.dateRange[0]));
    expect(wrapper.find(Typography).at(3).text()).toBe('Check-Out: ' + convertDate(request.dateRange[1]));
    expect(wrapper.find(Typography).at(4).text()).toBe('Total Earnings: $' + request.totalPrice);
  })
})
