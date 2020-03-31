import React,{Component}  from 'react';
import {
    Link
  } from "react-router-dom";
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            userProfile:'',
            users:[],
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
    componentWillMount () {
        if(localStorage.getItem('user')){
            this.setState({
                users:JSON.parse(localStorage.getItem('user'))
            })
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault()        
    }
    handleLoggin(){
        
        let {users} = this.state 
        //const {name,email} = this.state
        const found = users.some(el =>{
            return el.email === this.emailInput.value && el.password === this.passwordInput.value
         })
         if (found){
            localStorage.setItem('isLoggedIn',true)
            users.some(el =>{
                if(el.email === this.emailInput.value)
                {
                    var userName =[]
                    userName.push({name: el.name,email:el.email})                    
                    localStorage.setItem('userProfile',JSON.stringify(userName))
                }  
             })
            //localStorage.setItem('userProfile',userName)
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
                
                <form onSubmit={this.handleSubmit} className="form-bg mx-auto mt-5">
                    <h3 className="mb-3">Sign in</h3>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" ref={emailInput => this.emailInput = emailInput} name="email" className="form-control" id="inputEmail" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" ref={passwordInput => this.passwordInput = passwordInput} name="password" className="form-control" id="inputPassword" placeholder="Password" />                        
                    </div>
                    <button type="submit" onClick={this.handleLoggin} className="btn btn-primary">Sign in</button>
                    <p className="mb-0 mt-3">Don't have account <Link to="/register">Sign up</Link></p>
                </form>
                
            </div>
        )
    }
}

export default Login