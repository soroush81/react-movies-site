import { Movie, MovieForm, NotFound, Dashboard, Rental, Customers, LoginForm, Logout, RegisterForm, Posts, PostForm, ProtectedRoute } from '../../components'
import { Switch, Redirect, Route } from 'react-router-dom'
const Routes = ({ user }) => {
    return (
        <>
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
        </>
    )
}

export default Routes
