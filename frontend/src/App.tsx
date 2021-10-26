import { Box } from '@mui/system';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { JobFeedFilterContextProvider } from './contexts/JobFeedFilterContext';
import Home from './pages/Home';
import JobFeed from './pages/JobFeed';
import Login from './pages/Login';
import Listing from './pages/Listing';
import CreateReferral from './pages/Referral/CreateReferral';

const App = () => {
  return (
    <JobFeedFilterContextProvider>
      <Router>
        <Navbar />
        <Box sx={{ marginTop: '64px' }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/browse">
              {/* TODO */}
            </Route>
            <Route exact path="/jobs">
              <JobFeed />
            </Route>
            <Route exact path="/jobs/create">
              <Listing />
            </Route>
            <Route path="/jobs/:id/refer">
              <CreateReferral />
            </Route>
          </Switch>
        </Box>
      </Router>
    </JobFeedFilterContextProvider>
  );
};

export default App;
