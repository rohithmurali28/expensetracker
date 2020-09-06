import React, { Component } from 'react';
import './App.css';
import {InputField} from './Styles';
import {Redirect} from 'react-router-dom';

export default  class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      confirmPassword:"",
      message : "",
    }
  }
  validate = () =>{
    if(this.state.password === this.state.confirmPassword){
      let obj = {username:this.state.username,password:this.state.password}
      localStorage.setItem("credentials",JSON.stringify(obj));
      this.setState({message:""});
      this.props.history.push("/dashboard");  
    }
    else{
      this.setState({message:"Password mismatch"});
    }
  }
  render() {
    if(localStorage.getItem("credentials"))
    return(<Redirect to="/dashboard"/>)
    return (
      <div className="App">
       <div className="column">
         <span style={{marginBottom:10, fontSize:16, fontWeight:700}}>Create user</span>
          <InputField onChange={(ev)=>this.setState({username:ev.target.value})}  type="text" id="fname" placeholder="username"/>
         <InputField onChange={(ev)=>this.setState({password:ev.target.value})} type="password" placeholder="password"/>
         <InputField onChange={(ev)=>this.setState({confirmPassword:ev.target.value})} type="password" placeholder="confirm password"/>
          {this.state.message}
          <button onClick={this.validate}>Submit</button>
       </div>
      </div>
    );
  }
}


