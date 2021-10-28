import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
          <Navbar/>
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/browse">
          <Navbar/>
            {/* TODO */}
          </Route>
          <Route exact path="/refer">
          <Navbar/>
            {/* TODO */}
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
