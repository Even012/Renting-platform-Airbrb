import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HotelSharpIcon from '@mui/icons-material/HotelSharp';
import { useNavigate } from 'react-router-dom';

const ButtonAppBar = (props) => {
  const navigate = useNavigate();
  // console.log(props.token)
  const HandleMyListingBtn = () => {
    navigate('/dashboard');
  }
  const HandleAllListingBtn = () => {
    navigate('/');
  }
  const HandleLoginClick = () => {
    navigate('/login');
  }
  const HandleLogoutClick = () => {
    fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({})
    })
    props.setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }
  const HandleCreateBtn = () => {
    navigate('/dashboard/newlisting');
  }
  return (
    <>
      {(props.token)
        ? <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ mr: 1 }}
              >
                <HotelSharpIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ mr: 4, fontWeight: 'bold', fontSize: '1.6rem' }} onClick={HandleAllListingBtn}>
                AirBrB
              </Typography>
              <Button color="inherit" sx={{ mr: 2 }} onClick={ HandleAllListingBtn }>All Listings</Button>
              <Button color="inherit" sx={{ mr: 2 }} onClick={ HandleMyListingBtn }>My Listings</Button>
              <Button color="inherit" sx={{ mr: 2 }} onClick={ HandleCreateBtn }>Create new listing</Button>
              <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={ HandleLogoutClick }>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
        : <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ mr: 1 }}
              >
                <HotelSharpIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.6rem' }}>
                AirBrB
              </Typography>
              <Button color="inherit" sx={{ mr: 2 }} onClick={HandleAllListingBtn}>All Listings</Button>
              <Button color="inherit" onClick={HandleLoginClick}>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>}
    </>
  )
}
export default ButtonAppBar;
