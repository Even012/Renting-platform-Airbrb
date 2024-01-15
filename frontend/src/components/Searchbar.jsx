import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterPopup from './FilterPopup.jsx';
import Button from '@mui/material/Button';

const isSubstring = (strA, strB) => {
  // Convert both strings to lower case for a case-insensitive comparison
  const lowerStrA = strA.toLowerCase();
  const lowerStrB = strB.toLowerCase();
  // Check if strA is a substring of strB
  return lowerStrB.includes(lowerStrA);
}

const SearchSection = (props) => {
  const [searchText, setSearchText] = React.useState('');
  // const [publishedListings, setPublishedListings] = React.useState([]);
  const [openFilter, setOpenFilter] = React.useState(false);
  const HandleClickOpen = () => {
    setOpenFilter(true);
  };
  const HandleTextChange = (e) => {
    setSearchText(e.target.value);
  }
  const HandleSearchSubmit = () => {
    const filteredListings = props.listings.filter(listing => isSubstring(searchText, listing.address.street + listing.title));
    props.setListings(filteredListings);
  }
  const HandleReset = () => {
    props.setListings(JSON.parse(localStorage.getItem('publishedListings')));
  }
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField sx={{ width: '45%' }} id="searchbar" label="search title and city location" value={ searchText } onChange={ HandleTextChange } />
        <IconButton aria-label="filter" sx={{ ml: 3 }} onClick={ HandleClickOpen }>
          <TuneIcon sx={{ fontSize: '2rem' }}/>
        </IconButton>
        <IconButton aria-label="search" sx={{ ml: 3, fontSize: '2rem' }} onClick={ HandleSearchSubmit }>
          <SearchIcon sx={{ fontSize: '2rem' }}/>
        </IconButton>
        <Button variant="outlined" sx={{ ml: 3, fontSize: '1rem' }} onClick={ HandleReset }>Reset</Button>
      </Box>
      {/* filter popup */}
      <FilterPopup open={openFilter} setOpen={setOpenFilter} listings={props.listings} setListings={props.setListings}/>
    </>
  )
}

export default SearchSection;
