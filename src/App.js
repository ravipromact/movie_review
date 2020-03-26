import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,Link
} from "react-router-dom";
import Registeration from './components/register/register'
import Login from './components/login/login'
import Home from './components/home/home'
class App extends Component{

  constructor(props){
    super(props)
    this.state={
      isLoggedIn:JSON.parse(localStorage.getItem('isLoggedIn')),
      userProfile:JSON.parse(localStorage.getItem('user'))
    }
    this.handleLoggin = this.handleLoggin.bind(this)
  }

  handleLoggin(val){
    this.setState({
      isLoggedIn:val
    })
  }
  signOut = ()=>{
    localStorage.setItem('isLoggedIn',JSON.stringify(false))
    this.setState({
      isLoggedIn:false
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.isLoggedIn?
        
        (
          <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <button className="btn btn-danger" onClick={this.signOut}>Sign out</button>
                </li>
              </ul>
            </nav>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
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
