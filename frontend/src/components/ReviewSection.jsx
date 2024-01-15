import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import TextField from '@mui/material/TextField';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

const IconContainer = (props) => {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const ReviewSection = (props) => {
  const [rating, setRating] = React.useState(2);
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  const [inputValue, setInputValue] = React.useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const HandleReviewBtn = () => {
    fetch(`http://localhost:5005/listings/${props.listingId}/review/${props.bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        review: { ratingScore: rating, reviewText: inputValue }
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          alert('you have successfully left a review!')
        }
      })
  }

  return (
    <>
      <CardContent sx={{ p: '1rem 0 0 0' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ p: 0 }}>
        Leave your review here
        </Typography>
      </CardContent>
      <CardActions sx={{ p: '1rem 0 0 0', width: '80%' }}>
        <StyledRating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
        />
        <TextField fullWidth label="Review" variant="standard" sx={{ m: '0 1rem 0 1rem' }} value={inputValue} onChange={handleInputChange}/>
        <Button onClick={HandleReviewBtn} >Submit</Button>
      </CardActions>
    </>
  )
}

export default ReviewSection;
