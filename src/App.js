import React, { useState, useEffect } from 'react';
import { Box, Divider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/navBar/navBar'
import Movie from './components/movies/movies'
import NotFound from './components/common/notFound'
import Dashboard from './components/admin/dashboard'
import Rental from './components/cutomers/rental'
import Customers from './components/cutomers/customers';
import MovieForm from './components/movies/movieForm';
import LoginForm from './components/auth/loginForm';
import Logout from './components/auth/logout';
import RegisterForm from './components/auth/registerForm';
import Posts from './components/posts/posts';
import PostForm from './components/posts/postForm';
import ProtectedRoute from './components/common/proptectedRoute'
import auth from './services/authService'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {

      setUser(auth.getCurrentUser())
    } catch (ex) {

    }
  }, [])

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={RegisterForm} />
        <ProtectedRoute path='/movies/:id' component={MovieForm} />
        <Route path='/movies' render={(props) => <Movie {...props} user={user} />} />
        <Route path='/admin' component={Dashboard} />
        <Route path='/customers' component={Customers} />
        <Route path='/rental' component={Rental} />
        <ProtectedRoute path='/posts/:id' component={PostForm} />
        <Route path='/posts' component={Posts} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
      <div>
        <div style={{ width: '100%' }}>
          <Box m={2} />
          <Divider />
        </div>
      </div>
    </>
  );
}

export default App;
