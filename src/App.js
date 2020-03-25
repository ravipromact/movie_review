import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Registeration from './components/register/register'
import Login from './components/login/login'
import Home from './components/home/home'
class App extends Component{

  constructor(props){
    super(props)
    this.state={
      isLoggedIn:false
    }
    this.handleLoggin = this.handleLoggin.bind(this)
  }

  handleLoggin(val){
    this.setState({
      isLoggedIn:val
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.isLoggedIn?
        
        (
          <Router>
          <div>
            {/* <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav> */}
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              {/* <Route path="/register">
                <Registeration />
              </Route>
              <Route path="/login">
                <Login/>
              </Route> */}
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
        ):
        (
          <Router>
            <Switch>      
              <Route path="/register" component={Registeration} />
              <Route path="/" component={() => <Login triggerUpdate={this.handleLoggin} />}  />
            </Switch>
          </Router>
          
        )
      }
        
      </div>
    );
  }
  
}

export default App;
