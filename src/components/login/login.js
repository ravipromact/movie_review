import React,{Component}  from 'react';
import {
    Link
  } from "react-router-dom";
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
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
        
        const users = JSON.parse(localStorage.getItem('user'))
        //const {name,email} = this.state
        const found = users.some(el =>{
            return el.email === this.emailInput.value && el.password === this.passwordInput.value
         })
         if (found){
            localStorage.setItem('isLoggedIn',true)
            var loggedIn = localStorage.getItem('isLoggedIn')
            this.props.triggerUpdate(loggedIn);
            alert('Log in Success')
        }else{
            alert('Invalid Credential')
        }

        // if(this.emailInput.value === user[i].email && this.passwordInput.value === user[i].password ){
        //     localStorage.setItem('isLoggedIn',true)
        //     var loggedIn = localStorage.getItem('isLoggedIn')
        //     this.props.triggerUpdate(loggedIn);
        //     alert('Log in Success')
        // }else{
        //     alert('Invalid Credential')
        // }
        // for(var i=0;i<user.length;i++){
            
        // }
        // if(this.emailInput.value === user.email && this.passwordInput.value === user.password ){
        //     localStorage.setItem('isLoggedIn',true)
        //     var loggedIn = localStorage.getItem('isLoggedIn')
        //     this.props.triggerUpdate(loggedIn);
        //     alert('Log in Success')
        // }else{
        //     alert('Invalid Credentials')
        // }
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