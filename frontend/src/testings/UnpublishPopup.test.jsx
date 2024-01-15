import React from 'react'
// import { shallow } from 'enzyme'
import UnpublishPopup from '../components/UnpublishPopup'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('<UnpublishPopup>', () => {
  const mockSetOpenUnpublish = jest.fn();
  const listingId = '123';
  const listingName = 'Test Listing';
  it('should render an unpublish form', () => {
    render(<UnpublishPopup setOpenUnpublish={mockSetOpenUnpublish} openUnpublish={true} listingId={listingId} listingName={listingName}/>);
    expect(screen.getByText('Unpublish: Test Listing')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to unpublish this listing?')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Unpublish')).toBeInTheDocument();
  })
  it('back button functions well', () => {
    render(<UnpublishPopup setOpenUnpublish={mockSetOpenUnpublish} openUnpublish={true} listingId={listingId} listingName={listingName}/>);
    const backButton = screen.getByText('Back');
    userEvent.click(backButton);
    expect(mockSetOpenUnpublish).toHaveBeenCalledWith(false);
  })
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('unpublish button functions well', async () => {
    render(<UnpublishPopup openUnpublish={true} setOpenUnpublish={mockSetOpenUnpublish} listingId={listingId} listingName="Test Listing" />);
    fetch.mockResponseOnce(JSON.stringify({ data: 'some data' }));
    userEvent.click(screen.getByText('Unpublish'));

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5005/listings/unpublish/${listingId}`,
      expect.objectContaining({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: expect.stringContaining('Bearer ')
        },
      }),
    );
  })
})
