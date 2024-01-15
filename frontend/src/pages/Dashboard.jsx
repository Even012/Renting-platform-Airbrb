import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ButtonAppBar from '../components/Appbar.jsx';
import EditListing from '../components/EditListing.jsx';
import NewListing from '../components/NewListing.jsx';
import HostedListings from '../components/HostedListings.jsx';
import { useParams } from 'react-router-dom';
import Copyright from '../components/Footer';
import BookingRequests from '../components/BookingRequests.jsx';

const Dashboard = (props) => {
  const params = useParams();

  const getPage = () => {
    if (params.subRoute === 'newlisting') {
      return <NewListing />
    } else if (params.subRoute === 'editlisting') {
      return <EditListing />
    } else if (params.subRoute === 'bookingrequests') {
      return <BookingRequests />
    } else {
      return <HostedListings params={params} token={props.token}/>
    }
  }
  return (
    <>
      <CssBaseline />
      <ButtonAppBar position="relative" token={props.token} setToken={props.setToken} />
      {getPage()}
      <Copyright />
    </>
  );
}

export default Dashboard;
