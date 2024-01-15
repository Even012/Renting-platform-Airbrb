import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const StatsCard = (props) => {
  const params = useParams();
  const [acceptedRequestsThisYear, setAcceptedRequestsThisYear] = React.useState([]);
  const [postingDate, setPostingDate] = React.useState(null);
  const [daysOnline, setDaysOnline] = React.useState(null);
  const [daysBooked, setDaysBooked] = React.useState(0);
  const [profit, setProfit] = React.useState(0);

  React.useEffect(() => {
    const currYear = new Date().getFullYear;
    const begCurrYear = Date.parse(`${currYear}-01-01`);
    const tempAcceptedRequestsThisYear = [];
    for (const request of props.acceptedRequests) {
      if (begCurrYear <= Date.parse(request.dateRange[0])) {
        tempAcceptedRequestsThisYear.push(request);
      }
    }
    setAcceptedRequestsThisYear(tempAcceptedRequestsThisYear);
  }, [props.acceptedRequests])

  React.useEffect(() => {
    fetch(`http://localhost:5005/listings/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setPostingDate(data.listing.postedOn);
        }
      })
  }, [])

  React.useEffect(() => {
    if (postingDate == null) {
      setDaysOnline('this listing is not published');
    } else {
      // 86400000 = 1000 (ms to s) * 60 (s to min) * 60 (min to hr) * 24 (hr to day)
      const timeDiff = Math.floor((Date.now() - Date.parse(postingDate)) / 86400000);
      setDaysOnline(timeDiff);
    }
  }, [postingDate])

  React.useEffect(() => {
    let tempDaysBooked = 0;
    for (const request of acceptedRequestsThisYear) {
      const bookedDays = Math.floor((Date.parse(request.dateRange[1]) - Date.parse(request.dateRange[0])) / 86400000);
      tempDaysBooked += bookedDays;
    }
    setDaysBooked(tempDaysBooked);
  }, [acceptedRequestsThisYear])

  React.useEffect(() => {
    let tempProfit = 0;
    for (const request of acceptedRequestsThisYear) {
      tempProfit += request.totalPrice;
    }
    setProfit(tempProfit);
  }, [acceptedRequestsThisYear])

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography>
            How many days listing has been online: {daysOnline}
          </Typography>
          <Typography>
            Total number of booked days this year: {daysBooked}
          </Typography>
          <Typography>
            Total profit this year: ${profit}
          </Typography>
        </CardContent>
      </Card>
    </Grid >
  );
}

export default StatsCard;
