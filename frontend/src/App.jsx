import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Landingscreen from './pages/Landingscreen.jsx'

const App = () => {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
    }
  }, []);
  console.log(token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingscreen token={token} setToken={setToken}/>}/>
        {/* landingpage could be login/logout */}
        <Route path="/:id" element={<Landingscreen token={token} setToken={setToken}/>}/>
        {/* id is listing id */}
        <Route path="/login" element={<Login token={token} setToken={setToken}/>}/>
        <Route path="/register" element={<SignUp token={token} setToken={setToken}/>}/>
        <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken}/>}/>
        <Route path="/dashboard/:subRoute" element={<Dashboard token={token} setToken={setToken}/>}/>
        {/* subRoute could be editlisting or newlisting */}
        <Route path="/dashboard/:subRoute/:id" element={<Dashboard token={token} setToken={setToken}/>}/>
        {/* id is listing id */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
