import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,Link
} from "react-router-dom";
import Registeration from './components/register/register'
import Login from './components/login/login'
import Home from './components/home/home';
import MovieDetails from './components/movie-details/movie-details';
import PageNotFound from './PageNotFound'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
class App extends Component{

  constructor(props){
    super(props)
    this.state={
      isLoggedIn:JSON.parse(localStorage.getItem('isLoggedIn')),
      userProfile:JSON.parse(localStorage.getItem('userProfile'))
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
    let profile = [{name:"",email:""}]
    //localStorage.setItem('userProfile',JSON.stringify(profile))
    this.setState({
      isLoggedIn:false
    })
  }

  render(){
    const {userProfile} = this.state
    //alert(JSON.stringify(userProfile))
    //alert(JSON.stringify(this.state.userProfile))
    return (
      <div className="App">
        {this.state.isLoggedIn?
        
        (
          <Router>
          <div>
            {/* <nav>
              <ul>
                <li>
                  <button className="btn btn-danger" onClick={this.signOut}>Sign out</button>
                </li>
              </ul>
            </nav> */}
            <Navbar expand="lg">
              <div className="container">
                <Navbar.Brand href="#home">
                <img className="mr-3 rounded" width="55" src={require(`././assests/img/logo.png`)} alt="Generic"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/register" className="nav-link" >Register</Link>
                  </Nav>
                  <Form inline className="mr-3">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="primary">Search</Button>
                  </Form>

                  <Dropdown>
                    <Dropdown.Toggle variant="light" className="profile-btn" id="dropdown-basic">
                      <img className="rounded-circle" width="35" src={require(`././assests/img/avatar.png`)} alt="Generic"/>
                      
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight>
                      <div className="px-3">
                        {/* <p className="mb-0">{userProfile[0].name}</p>
                        <small>{userProfile[0].email}</small> */}
                      </div>
                      <Dropdown.Item onClick={this.signOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Collapse>
              </div>
            </Navbar>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/register" component={Registeration} />
              <Route path="/404" component={PageNotFound} />
              <Route path="/:id" component={MovieDetails} />
              
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
