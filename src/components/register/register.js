import React,{Component}  from 'react';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

const formValid = ({formErrors,...rest}) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        if(val.length > 0){
            valid = false
        }
    })
    Object.values(rest).forEach(val => {
        if(val == null){
            valid = false
        }
    })
    return valid
}

class Registeration extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            email:null,
            password:null,
            formErrors:{
                name:'',
                email:'',
                password:''
            }
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        if(formValid(this.state)){
            console.log(`
            Name: ${this.state.name}
            Email: ${this.state.email}
            Password: ${this.state.password}
            `)
            localStorage.setItem('user',JSON.stringify(this.state))

        }else{
            console.log('Form Invalid')
        }
    }

    handleChange = (e) =>{
        const {name,value} = e.target;
        let formErrors = this.state.formErrors
        switch(name){
            case 'name': formErrors.name = value.length <3 ? 'Minimum 3 characters required':''
            break;
            case 'email': formErrors.email = emailRegex.test(value)? '':'Invalid Email'
            break;
            case 'password': formErrors.password =value.length <6 ? 'Minimum 6 characters required':''
            break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value})
    }

    render(){
        let {formErrors,name,email,password} = this.state;
        const enabled = name && email && password
        return(
            <div className="container">
                
                <div className="col-12">
                <h2>Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" name="name" className={`form-control ${formErrors.name.length>0?"border-danger":null}`} onChange={this.handleChange} id="inputName" placeholder="Name" />
                            {formErrors.name.length>0 &&
                                <p className="text-danger">{formErrors.name}</p>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" name="email" className={`form-control ${formErrors.email.length>0?"border-danger":null}`} onChange={this.handleChange} id="inputEmail" placeholder="Email" />
                            {formErrors.email.length>0 &&
                                <p className="text-danger">{formErrors.email}</p>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" name="password" className={`form-control ${formErrors.password.length>0?"border-danger":null}`} onChange={this.handleChange} id="inputPassword" placeholder="Password" />
                            {formErrors.password.length>0 &&
                                <p className="text-danger">{formErrors.password}</p>
                            }
                        </div>
                        <button type="submit" disabled={!enabled} className="btn btn-primary">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registeration