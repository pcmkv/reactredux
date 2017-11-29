import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import App from './App';
import Home from './Home';

const history = createHistory();

const middleware = routerMiddleware(history);

const operationlist = (state = {} ,action) => {
    if (action.type === 'ADD_PHASE') {
        return { listPhase: action.payload,
            ...state}
    }
    else if (action.type === 'ADD_TMC') {
        return {listTmc: action.payload,
            ...state}
    }
    else if (action.type === 'ADD_BRIGADES') {
        return {listBrigade: action.payload,
            ...state}
    }
    else if(action.type === 'ADD_VEHICLES'){
        return {listVehicles: action.payload,
            ...state}
    }
    else if(action.type === 'ADD_ACCESSLEVELS'){
        return {listAccessLevels: action.payload,
            ...state}
    }
    else if(action.type === 'ADD_ACTIVITYTYPES'){
        return {listActivityTypes: action.payload,
            ...state}
    }
    else if(action.type === 'ADD_TECHOPERATIONUNITS'){
        return {listTechOperationUnits: action.payload,
            ...state}
    }
    else if(action.type === 'ADD_TECHOPERATIONS'){
        return {listTechOperations: action.payload,
            ...state}
    }
    else if(action.type === 'GET_OPERATION_INFO'){
        return {operationInfo: action.payload,
            ...state}
    }
    else if(action.type === 'EDIT_OPERATION'){
        return {putTechOperation: action.payload,
            ...state}
    }
    return state;
};


let listPhase;
let listTmc;
let listBrigades;
let listVehicles;
let listAccessLevels;
let listActivityTypes;
let listTechOperationUnits;
let listTechOperations;
let operationInfo;
let putTechOperation;

async function getPhases() {
    fetch('http://agro.bidon-tech.com:8081/api/Phases', {
     mode: 'cors',
     method: 'get',
     headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'bearer ' + localStorage.getItem('myData')
     }
     }).then((resp) => {
     return resp.json()
     }).then(function (data) {
     listPhase = data;
     console.log("data listPhase",listPhase);
     return data;
     });
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/Phases', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
       console.log("get Phases DATA",data);
         listPhase = data;
        return listPhase;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getTmc(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/materialassets', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("get TMC DATA",data);
        listTmc =  data;
        return listTmc;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getBrigades(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/Brigades', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("get Brigades DATA",data);
        listBrigades =  data;
        return listBrigades;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getVehicles(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/vehicles', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("get VEHICLES  DATA",data);
        listVehicles =  data;
        return listVehicles;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getAccessLevels(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/accesslevels', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("getAccessLevels DATA",data);
        listAccessLevels =  data;
        return listAccessLevels;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getActivityTypes(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/activitytypes', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("getActivityTypes DATA",data);
        listActivityTypes =  data;
        return listActivityTypes;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getTechOperationUnits(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/techoperationunits', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("getTechOperationUnits DATA",data);
        listTechOperationUnits =  data;
        return listTechOperationUnits;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function getTechOperations(){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/techoperations', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("getTechOperations DATA",data);
        listTechOperations =  data;
        return listTechOperations;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

export async function getTechOperation(operationId){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/techoperations/'+operationId, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("getOperation DATA",data);
        operationInfo =  data;
        return operationInfo;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

export async function editTechOperation(operationId){
    try {
        let response = await fetch('http://agro.bidon-tech.com:8081/api/techoperations/'+operationId, {
            mode: 'cors',
            method: 'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + localStorage.getItem('myData')
            }
        });
        let data = await response.json();
        console.log("putOperation DATA",data);
        putTechOperation =  data;
        return putTechOperation;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}



/*export const store = createStore(operationlist, applyMiddleware(routerMW, thunk));*/

export const store = createStore(
  combineReducers({
    router: routerReducer,
      operationlist
  }),
  applyMiddleware(middleware)
);

store.subscribe(() => {
    store.getState();
});


async function load() {
    store.dispatch({type: 'ADD_PHASE', payload: await getPhases()});
    store.dispatch({type: 'ADD_TMC', payload: await getTmc()});
    store.dispatch({type: 'ADD_BRIGADES', payload: await getBrigades()});
    store.dispatch({type: 'ADD_VEHICLES', payload: await getVehicles()});
    store.dispatch({type: 'ADD_ACCESSLEVELS', payload: await getAccessLevels()});
    store.dispatch({type: 'ADD_ACTIVITYTYPES', payload: await getActivityTypes()});
    store.dispatch({type: 'ADD_TECHOPERATIONUNITS', payload: await getTechOperationUnits()});
    store.dispatch({type: 'ADD_TECHOPERATIONS', payload: await getTechOperations()});
}

load();


// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/operation/:id" component={Home} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);