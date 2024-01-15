import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ButtonAppBar from '../components/Appbar.jsx';
import Copyright from '../components/Footer.jsx';
import PublishedListings from '../components/PublishedListing.jsx';
import { useParams } from 'react-router-dom';
import ListingView from '../components/ListingView.jsx';
import SearchSection from '../components/Searchbar.jsx';

const Landingscreen = (props) => {
  const [listings, setListings] = React.useState([]);
  const params = useParams();
  React.useEffect(() => {
    const publishedListings = JSON.parse(localStorage.getItem('publishedListings'));
    setListings(publishedListings);
  }, []);

  React.useEffect(() => {
    fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          const allListings = data.listings;
          const Promises = data.listings.map(listing =>
            fetch(`http://localhost:5005/listings/${listing.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }))
          Promise.all(Promises)
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(data => {
              data = data.map(element => element.listing)
              let filteredListings = data.filter(element => {
                return element.published;
              })
              filteredListings = allListings.filter(listing => (filteredListings.filter(fl => (fl.title === listing.title && fl.owner === listing.owner)).length === 1))
              setListings(filteredListings);
              localStorage.setItem('publishedListings', JSON.stringify(filteredListings));
            })
        }
      })
  }, [])
  // console.log(listings);
  // console.log(props.token)
  return (
    <>
      <CssBaseline />
      <ButtonAppBar token={props.token} setToken={props.setToken}/>
      {(params.id)
        ? < ListingView listingID={params.id} token={props.token}/>
        : <>
          <main>
            <SearchSection listings={listings} setListings={setListings}/>
            <PublishedListings token={props.token} listings={listings} setListings={setListings} />
          </main>
          <Copyright />
        </>
      }
    </>
  );
}

export default Landingscreen;
