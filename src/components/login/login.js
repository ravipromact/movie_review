import React,{Component}  from 'react';
import {
    Link
  } from "react-router-dom";
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:null,
            password:null,
            formErrors:{
                email:'',
                password:''
            }
        }
        this.handleLoggin = this.handleLoggin.bind(this)
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        
    }
    handleLoggin(){
        
        const user = JSON.parse(localStorage.getItem('user'))
        if(this.emailInput.value === user.email && this.passwordInput.value === user.password ){
            this.props.triggerUpdate(true);
        }else{
            alert('Invalid Credentials')
        }
      }
    render(){
        
        
        return(
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" ref={emailInput => this.emailInput = emailInput} name="email" className="form-control" id="inputEmail" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" ref={passwordInput => this.passwordInput = passwordInput} name="password" className="form-control" id="inputPassword" placeholder="Password" />                        
                    </div>
                    <button type="submit" onClick={this.handleLoggin} className="btn btn-primary">Sign in</button>
                </form>
                <p>Don't have account <Link to="/register">Sign up</Link></p>
            </div>
        )
    }
}

export default Login