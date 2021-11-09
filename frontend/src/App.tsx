import { Box } from '@mui/system'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { JobFeedFilterContextProvider } from './contexts/JobFeedFilterContext'
import Home from './pages/Home'
import JobFeed from './pages/JobFeed'
import Login from './pages/Login'
import Listing from './pages/JobFeedCreation'
import Profile from './pages/Profile'
import { AuthProvider } from './hooks/useAuth'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <JobFeedFilterContextProvider>
        <Router>
          <Box sx={{ marginTop: '64px' }}>
            <Switch>
              <Route exact path='/login'>
                <Login />
              </Route>
              <PrivateRoute exact path='/'>
                <Navbar />
                <Home />
              </PrivateRoute>
              <PrivateRoute component={Navbar} exact path='/refer'>
                <Navbar />
                {/* TODO */}
              </PrivateRoute>
              <PrivateRoute exact path='/jobs'>
                <Navbar />
                <JobFeed />
              </PrivateRoute>
              <Route exact path='/jobs/create'>
                <Navbar />
                <Listing />
              </Route>
              <Route exact path='/profile'>
                <Navbar />
                <Profile />
              </Route>
            </Switch>
          </Box>
        </Router>
      </JobFeedFilterContextProvider>
    </AuthProvider>

  )
}

export default App
