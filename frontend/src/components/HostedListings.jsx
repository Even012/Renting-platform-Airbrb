import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ListingCard from './ListingCard';
import ListingView from './ListingView';
// import { LineChart } from '@mui/x-charts/LineChart';
import ProfitsGraph from './ProfitsGraph';

const HostedListings = (props) => {
  const [listings, setListings] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setListings(data.listings.filter(listing => listing.owner === localStorage.getItem('userEmail')));
          // data.listings.map(listing => console.log(listing.title));
        }
      })
  }, [])

  return (
    <main>
      {/* Hero unit */}
      {(props.params.id)
        ? <ListingView listingID={props.params.id} token={props.token} />
        : <>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                My Listings
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {listings.map((listing, index) => (
                <ListingCard key={index} listing={listing} listings={listings} setListings={setListings} />
              ))}
            </Grid>
          </Container>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Listing Profits
            </Typography>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                <ProfitsGraph/>
                {/* <LineChart
                  xAxis={[{
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                    label: 'how many days ago'
                  }]}
                  yAxis={[{ label: 'earnings ($)' }]}
                  series={[
                    {
                      // data: profitsThisMonth,
                      data: [2, 2],
                    },
                  ]}
                  width={1000}
                  height={300}
                /> */}
              </Grid>
            </Container>
          </Box>
        </>
      }
    </main>
  )
}

export default HostedListings;
