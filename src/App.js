import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'

import './App.css';

class App extends Component {
    constructor(props){
      super(props);
        let userToken;
        const getToken = (login,password)=>{
            let body = `grant_type=password&username=${login}&password=${password}`;
            fetch('http://agro.bidon-tech.com:8081/api/token', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            }).then(function(response) {
               /* console.log(response.json());*/
             return response.json()
            }).then(function(body) {
               /* console.log(body);*/
                userToken = body.access_token;
                /*console.log("userToken",userToken);*/
                localStorage.setItem('myData', userToken);
            });
        };
      getToken('max.test','admin');
    }


  render() {
      console.log("TestStore",this.props.testStore);
    return (
        <div className="Test">Test</div>
    )
  }
}

export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({})
)(App);