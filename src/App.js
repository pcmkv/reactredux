import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button , Modal , Checkbox ,Form, FormGroup , ControlLabel , FormControl} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'



class App extends Component {
    listTechOperation;
    constructor(props){
      super(props);
        this.state = {
            nameOperation:'',
            phaze:'',
            manualOperation:false,
            useMaterialAssets:false,
            isSupport:false,
            activityTypeId: null,
            showModal: false,
            list:0
        };
        console.log("State isSupport",this.state.isSupport);

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
        getToken('max2.test','admin');

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.create = this.create.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.toggleManualOperation = this.toggleManualOperation.bind(this);
        this.toggleUseMaterialAssets  = this.toggleUseMaterialAssets.bind(this);
        this.toggleIsSupport  = this.toggleIsSupport.bind(this);
        this.addList = this.addList.bind(this);
    }



    close() {
        this.setState({ showModal: false });
    };
    open() {
        this.setState({ showModal: true });
    };

    updateInputValue(evt) {
        this.setState({
            nameOperation: evt.target.value
        });
    }

    toggleManualOperation() {
        this.setState({manualOperation: this.state.manualOperation = !this.state.manualOperation});
    }
   
    toggleUseMaterialAssets(){
       this.setState({ useOperation: this.state.useMaterialAssets = !this.state.useMaterialAssets });
    }

    toggleIsSupport(){
        this.setState({ isSupport: this.state.isSupport = !this.state.isSupport });
    }

    addList(){
       this.setState({
           list:this.state.list+1
       })
    }

    create(e){
        e.preventDefault();
        console.log("Создание ТехОпер");
        let nameTechOper = this.refs.nameTechOperation.value;
        let activityTypeName = this.refs.activityTypeId.value;
        let activityTypeId = this.refs.activityTypeId.id;
        let namePhaza = this.refs.phaza.value;
        let nameId = this.refs.phaza.id;
        let techOperId = this.refs.techOperationUnitId.id;
        let body = {
            "name": this.state.nameOperation,
            "manualOperation": this.state.manualOperation,
            "activityTypeId": activityTypeId,
            "techOperationUnitId ": this.refs.techOperationUnitId.id,
            "phases": [
                {
                    "name": '' + namePhaza,
                    "isPreparation": true,
                    "id": Number(nameId),
                    "active": true
                }
            ]
        };
        console.log(JSON.stringify(body));
        console.log("NAME:",this.state.nameOperation);
        console.log("Manual Operation:",this.state.manualOperation);
        console.log("useMaterialAssets Operation:",this.state.useMaterialAssets);
        console.log("isSupport:",this.state.isSupport);
        console.log("activityTypeId:",activityTypeId);
        console.log("techOperId:",techOperId);
        this.createOper(this.state.nameOperation,
            this.state.manualOperation,
            this.state.useMaterialAssets,
            this.state.isSupport,activityTypeId,techOperId);
    }


    createOper(name,manualOperation ,useMaterialAssets,isSupporting,activityTypeId,techOperationUnitId){
        //let body = `name=${name}&manualOperation=${manualOperation }&useMaterialAssets=${useMaterialAssets}&isSupporting=${isSupporting}&activityTypeId=${activityTypeId}&techOperationUnitId=${techOperationUnitId}`;
       let body = JSON.stringify({
           name:name,
           manualOperation:''+manualOperation,
           useMaterialAssets:''+useMaterialAssets,
           isSupporting:''+isSupporting,
           activityTypeId:activityTypeId,
           techOperationUnitId:techOperationUnitId
       });
        console.log("BODY",body);
        fetch('http://agro.bidon-tech.com:8081/api/techoperations', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' +localStorage.getItem('myData')
            },
            body
        }).then(function(response) {
            console.log(response);
            if(response.status == 201){
                console.log("СОЗДАННО");
            }
            return response.json();
        }).then(function(body) {
            console.log(body);
        });

    };

  render() {
      console.log("TestStore",this.props.testStore);
      let fields = [];
      for (let i = 0; i < this.state.list; i++) {
          if (this.props.testStore.operationlist.listPhase !== undefined) {
              fields.push(
                  <FormGroup>
                      <FormControl componentClass="select" placeholder="select">
                      {this.props.testStore.operationlist.listPhase.map((option, index) =>
                          <option key={index} id={option.id} value={option.name} ref="phaza">
                              {option.name}
                          </option>)}
                      </FormControl><Button  bsStyle="warning">-</Button>
                  </FormGroup>
                  );
          }
      }
      return (
        <div className="Test">
            {(this.props.testStore.operationlist.listTechOperations !== undefined) ? this.props.testStore.operationlist.listTechOperations.map(function (item) {
                return (
                    <li key={item.id}>
                        <NavLink to={`/operation/${item.id}`}>{item.name}</NavLink>
                    </li>
                )
            }) : ''
            }
            <p>Создать тех. операцию
            <Button
                bsStyle="primary"
                bsSize="small"
                onClick={this.open}
            >+</Button></p>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>СТВОРЕННЯ ТЕХНОЛОГІЧНОЇ ОПРАЦІЇ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.create}>
                                <FormGroup>
                                    <ControlLabel>Имя</ControlLabel>
                                    <FormControl type="text"
                                                 placeholder="Имя операции"
                                                 ref="nameTechOperation"
                                                 onChange={this.updateInputValue}>
                                        </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Ручные операции</ControlLabel>
                                    <Checkbox ref="check_me" onChange={this.toggleManualOperation} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Материальные активы</ControlLabel>
                                    <Checkbox onChange={this.toggleUseMaterialAssets} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>isSupport</ControlLabel>
                                    <Checkbox onChange={this.toggleIsSupport} />
                                </FormGroup>
                                {
                                    (this.props.testStore.operationlist.listPhase !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Фазы</ControlLabel> <Button onClick={this.addList} bsStyle="success">Добавить</Button>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listPhase.map((option, index) =>
                                                <option key={index} id={option.id} value={option.name} ref="phaza">
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> :''
                                }
                                {fields}
                                {(this.props.testStore.operationlist.listBrigade !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Бригады</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listBrigade.map((option, index) =>
                                                <option key={index} value={option}>
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                {(this.props.testStore.operationlist.listActivityTypes !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Вид д-ти</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listActivityTypes.map((option, index) =>
                                                <option key={index} id={option.id} value={option.name} ref="activityTypeId">
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                {(this.props.testStore.operationlist.listTechOperationUnits !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Единиц измерения</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listTechOperationUnits.map((option, index) =>
                                                <option key={index} value={option} id={option.id}  ref="techOperationUnitId">
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                {(this.props.testStore.operationlist.listVehicles !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Техника</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listVehicles.map((option, index) =>
                                                <option key={index} value={option}>
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                {(this.props.testStore.operationlist.listAccessLevels !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Уровень доступа</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listAccessLevels.map((option, index) =>
                                                <option key={index} value={option}>
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                {(this.props.testStore.operationlist.listTechOperations !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>Тех операции</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listTechOperations.map((option, index) =>
                                                <option key={index} value={option}>
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                {(this.props.testStore.operationlist.listTmc !== undefined) ?
                                    <FormGroup>
                                        <ControlLabel>ТМЦ</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            {this.props.testStore.operationlist.listTmc.map((option, index) =>
                                                <option key={index} value={option}>
                                                    {option.name}
                                                </option>)}
                                        </FormControl>
                                    </FormGroup> : ''
                                }
                                <Modal.Footer>
                                    <Button onClick={this.create} bsStyle="success" type="submit">Создать</Button>
                                    <Button onClick={this.close} bsStyle="warning">Закрыть</Button>
                                </Modal.Footer>

                            </Form>
                        </Modal.Body>
                    </Modal>

        </div>


    )
  }
}

export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({})
)(App);