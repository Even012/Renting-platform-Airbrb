import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { convertDate } from '../helpers';

const HistoryCard = (props) => {
  return (
    <Grid sx={{ py: 1 }}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.request.status}
          </Typography>
          <Typography>
            Guest Email: {props.request.owner}
          </Typography>
          <Typography>
            Check-In: {convertDate(props.request.dateRange[0])}
          </Typography>
          <Typography>
            Check-Out: {convertDate(props.request.dateRange[1])}
          </Typography>
          <Typography>
            Total Earnings: ${props.request.totalPrice}
          </Typography>
        </CardContent>
      </Card>
    </Grid >
  );
}

export default HistoryCard;
