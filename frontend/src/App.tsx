import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './hooks/useAuth'

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <Home />
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
    </AuthProvider>
  )
}

export default App
