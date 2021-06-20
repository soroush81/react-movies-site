import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './components/routes/routes'
import NavBar from './components/navBar/navBar'
import auth from './services/authService'
import { light,dark } from './theme';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(true)
  const appliedTheme = createMuiTheme(theme ? light : dark)
  const icon = (theme) ? <Brightness7Icon /> : <Brightness3Icon />
  useEffect(() => {
    try {

      setUser(auth.getCurrentUser())
    } catch (ex) {

    }
  }, [])

  return (
    <>
     <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <ToastContainer />
      <NavBar user={user} toggleTheme={() => setTheme(!theme)} themeIcon={icon} />
      <Routes user={user} />
      </ThemeProvider>
    </>
  );
}

export default App;
