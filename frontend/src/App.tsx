import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Listing from './pages/Listing'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/list/create'>
          <Listing />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/browse'>
          {/* TODO */}
        </Route>
        <Route exact path='/refer'>
          {/* TODO */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
