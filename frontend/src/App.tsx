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

const App = () => {
  return (
    <AuthProvider>
      <JobFeedFilterContextProvider>
        <Router>
          <Box sx={{ marginTop: '64px' }}>
            <Switch>
              <Route exact path='/'>
                <Navbar />
                <Home />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/refer'>
                <Navbar />
                {/* TODO */}
              </Route>
              <Route exact path='/jobs'>
                <Navbar />
                <JobFeed />
              </Route>
              <Route exact path='/jobs/create'>
                <Navbar />
                <Listing />
              </Route>
              <Route exact path='/Profile'>
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
