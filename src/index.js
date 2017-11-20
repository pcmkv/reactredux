import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let listPhase;
let listTmc;
let listBrigades;
async function getPhases() {
    /*fetch('http://agro.bidon-tech.com:8081/api/Phases', {
     mode: 'cors',
     method: 'get',
     headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'bearer ' + localStorage.getItem('myData')
     }
     }).then((resp) => {
     return resp.json()
     }).then(function (data) {
     console.log("data response",data);
     listPhase = data;
     console.log("data listPhase",listPhase);
     return data;
     });*/
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
        listPhase =  data;
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
        return listPhase;
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

/*getPhases().then((data)=>{
    console.log("DATA getPhases",data);
});

getTmc().then((data)=>{
    console.log("DATA getTmc",data);
});

getBrigades().then((data)=>{
    console.log("DATA getBrigades",data);
});*/

const operationlist = (state = {} ,action) => {
    if (action.type === 'ADD_PHASE') {
        console.log("ADD_PHASE state", state);
        return { listPhase: action.payload,
            ...state}
    }
    else if (action.type === 'ADD_TMC') {
        console.log("ADD_TMC state", state);
        return {listTmc: action.payload,
            ...state}
    }
    else if (action.type === 'ADD_BRIGADES') {
        console.log("ADD_BRIGADES state", state);
        return {listBrigade: action.payload,
            ...state}
    }
    return state;
};

const store = createStore(operationlist);

store.subscribe(() => {
  /*  console.log("Subscribe",*/store.getState();
});

store.dispatch({type: 'ADD_PHASE', payload: getPhases()});
store.dispatch({type: 'ADD_TMC', payload: getTmc()});
store.dispatch({type: 'ADD_BRIGADES', payload: getBrigades()});

console.log("Store new getState",store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
