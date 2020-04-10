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
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ListGroup from 'react-bootstrap/ListGroup'
class App extends Component{

  constructor(props){

    super(props)
    this.state={
      isLoggedIn:JSON.parse(localStorage.getItem('isLoggedIn')),
      movies:JSON.parse(localStorage.getItem('movies')),
      search:'',
      //userProfile:JSON.parse(localStorage.getItem('userProfile'))
    }
    this.handleLoggin = this.handleLoggin.bind(this)
  }
  
 
  handleLoggin(val,user){
    alert('Login')
    this.setState({
      isLoggedIn:val
    })
  }
  updateSearch = (e)=>{
    this.setState({search:e.target.value.substr(0,20)})        
  }
  signOut = ()=>{
    localStorage.setItem('isLoggedIn',JSON.stringify(false))
    //let profile = [{name:"",email:""}]
    
    this.setState({
      isLoggedIn:false,
      //userProfile:localStorage.setItem('userProfile',JSON.stringify(profile))
    })
   // alert(this.state.userProfile)
  }

  render(){
    const userprofile = JSON.parse(localStorage.getItem('userProfile'))
    let filteredList = this.state.movies.filter((movie)=>{
      return movie.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    }) 
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
                  <Form inline className="mr-3 position-relative">
                    <FormControl type="text" value={this.state.search} onChange={this.updateSearch} placeholder="Search"/>
                    {this.state.search !=='' && 
                    <ListGroup className="px-2 pb-2">
                        <div className="innerMenu">
                        {filteredList.map((movie,i) => {
                            return(
                                
                                    <Link className="movielink pt-2 d-block text-white text-decoration-none" to={{pathname:`${movie.id}`,aboutProps:this.state.movies[i]}} key={movie.name}>
                                        <div className="media">
                                        <img src={require(`././assests/img/${movie.poster}.jpg`)} alt='movie poster' className=" rounded" width="70" height="80" />
                                        <div className="media-body pl-2">
                                            <h6 className="mb-1">{movie.name} ({movie.year})</h6> 
                                        </div>
                                        </div>
                                    </Link>
                            )
                        })}
                        </div>
                    </ListGroup>
                    }
                    {/* <ListGroup>
                      <ListGroup.Item>Cras justo odio</ListGroup.Item>
                      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup> */}
                  </Form>

                  <Dropdown>
                    <Dropdown.Toggle variant="light" className="profile-btn" id="dropdown-basic">
                      <img className="rounded-circle" width="35" src={require(`././assests/img/avatar.png`)} alt="Generic"/>
                      
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight>
                      <div className="px-3">
                      {/* <Welcome name={userProfile[0].name} /> */}
                        <div>
                          <p className="mb-0">{userprofile[0].name}</p>
                          <small>{userprofile[0].email}</small>
                        </div>
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
