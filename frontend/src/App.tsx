import { Box } from '@mui/system'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
import { JobFeedFilterContextProvider } from './contexts/JobFeedFilterContext'
import Home from './pages/Home'
import JobFeed from './pages/JobFeed'
import Login from './pages/Login'
import Listing from './pages/JobFeedCreation'
import Profile from './pages/Profile'
import ApplicantTableView from './pages/ApplicantTableView'
import { AuthProvider } from './hooks/useAuth'
import PrivateRoute from './components/Routes/PrivateRoute'
import RestrictedRoute from './components/Routes/RestrictedRoute'
import NoMatch from './pages/NoMatch'

const App = () => {
  return (
    <JobFeedFilterContextProvider>
      <Router>
        <AuthProvider>
          <Box sx={{ marginTop: '64px' }}>
            <Switch>
                <RestrictedRoute component={Login} exact path='/login' />
                <PrivateRoute component={Home} exact path='/' />
                {/* <PrivateRoute component={Home} exact path='/refer' /> */}
                <PrivateRoute component={JobFeed} exact path='/jobs' />
                <PrivateRoute component={Listing} exact path='/jobs/create' />
                <PrivateRoute component={Profile} exact path='/profile' />
                <PrivateRoute component={ApplicantTableView} exact path='/jobs/applicants' />
                <Route component={NoMatch} /> {/* No match => page not found */}
            </Switch>
          </Box>
        </AuthProvider>
      </Router>
    </JobFeedFilterContextProvider>
  )
}

export default App
