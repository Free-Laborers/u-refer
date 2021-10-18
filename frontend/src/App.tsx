import { Box } from '@mui/system'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { JobFeedFilterContextProvider } from './contexts/JobFeedFilterContext'
import Home from './pages/Home'
import JobFeed from './pages/JobFeed'
import Login from './pages/Login'


const App = () => {
  return (
    <JobFeedFilterContextProvider>
      <Router>
        <Navbar />
        <Box sx={{marginTop: '64px'}}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/refer'>
              {/* TODO */}
            </Route>
            <Route exact path='/jobs'>
              <JobFeed />
            </Route>
          </Switch>
        </Box>
      </Router>
    </JobFeedFilterContextProvider>
  )
}

export default App
