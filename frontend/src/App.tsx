import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import JobFeed from './pages/JobFeed'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <Navbar/>
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
    </Router>
  )
}

export default App
