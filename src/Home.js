import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col, Button  , Checkbox ,Form, FormGroup , ControlLabel , FormControl} from 'react-bootstrap';
import {store} from './index';
import {getTechOperation} from './index';


/* async load() {
 store.dispatch({
 type: 'GET_OPERATION_INFO',
 payload: await getTechOperation(this.props.match.params.id)
 });
 }*/

class Home extends Component {
    id;
    operationInfo;
    matchUrl;
    constructor(props) {
        super(props);
        console.log("PROPS",this.props);
         this.matchUrl = this.props.location.pathname.split('/');
        console.log("Location",this.matchUrl[2]);
       this.id = this.matchUrl[2];
        console.log("ID",this.id);

        this.state = {
            name: null,
            manualOperation: null,
            useMaterialAssets: null,
            isSupporting:null,
            activityTypeId:null,
            techOperationUnitId: null
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        //this.load();

        await getTechOperation(this.props.match.params.id).then(data => {
            this.operationInfo = data;
            console.log("Main operation", this.operationInfo);
            this.setState({
                name: this.operationInfo.name,
                manualOperation: this.operationInfo.manualOperation,
                useMaterialAssets: this.operationInfo.useMaterialAssets,
                isSupporting:this.operationInfo.isSupporting,
                activityTypeId:this.operationInfo.activityType.id,
                techOperationUnitId: this.operationInfo.techOperationUnit.id
            });
            console.log("NEW STATE",this.state);
        });
    }

    updateInputValue(event) {
        console.log(event.target.value);
        this.setState({
            name: event.target.value
        });
    }



  checkedVal(fieldName) {
      return (e) => {
          console.log("target",e.target.value);
          this.setState({
              [fieldName]: !this.state[fieldName]
          });
          console.log(this.state[fieldName]);

          /*if (this.state[fieldName]) {
              console.log("old1",this.state[fieldName]);
              this.setState({[fieldName]: !e.target.value});
              console.log("old2",this.state[fieldName]);
          } else {
              console.log("old3",this.state[fieldName]);
              this.setState({[fieldName]: e.target.value});
              console.log("old4",this.state[fieldName]);
          }*/
      }
  }

    handleChange(e){
        this.setState({
            techOperationUnitId:e.target.value
        });
        console.log("target.id",this.state.techOperationUnitId);
    }
    create(e){
        e.preventDefault();
        console.log(this.refs.techOperationUnitId.id);
      let body = JSON.stringify({
          name:this.state.name,
          manualOperation:this.state.manualOperation,
          useMaterialAssets:this.state.useMaterialAssets,
          isSupporting:this.state.isSupporting,
          activityTypeId:this.state.activityTypeId,
          techOperationUnitId:Number(this.state.techOperationUnitId),
          lastModified: this.operationInfo.lastModified

        });
        console.log("BODY",body);
        fetch('http://agro.bidon-tech.com:8081/api/techoperations/'+this.id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' +localStorage.getItem('myData')
            },
            body
        }).then(function(response) {
            return response.json();
        }).then(function(body) {
            console.log(body);
        });

    }

    render() {
        console.log("TestStore", this.props.testStore);
        return (
            <Grid>
                {
                    (this.operationInfo !== null && this.operationInfo !== undefined) ?
                        <Row className="show-grid">
                            <Col md={4}>
                                <Form onSubmit={this.create}>
                                    <FormGroup>
                                        <ControlLabel>Имя</ControlLabel>
                                        <FormControl type="text"
                                                     placeholder="Имя операции"
                                                     ref="nameTechOperation"
                                                     value={this.state.name}
                                                     onChange={this.updateInputValue}>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Ручные операции</ControlLabel>
                                        <Checkbox
                                                value={this.state.manualOperation}
                                                checked={this.state.manualOperation}
                                                onChange={this.checkedVal('manualOperation')}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>isSupporting</ControlLabel>
                                        <Checkbox
                                                  checked={this.state.isSupporting}
                                                  value={this.state.isSupporting}
                                                  onChange={this.checkedVal('isSupporting')}
                                                  ref="isSupporting"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>useMaterialAssets</ControlLabel>
                                        <Checkbox
                                                  checked={this.state.useMaterialAssets}
                                                  value={this.state.useMaterialAssets}
                                                  onChange={this.checkedVal('useMaterialAssets')}
                                        />
                                    </FormGroup>
                                    {/*(this.props.testStore.operationlist.listPhase !== undefined) ?
                                        <FormGroup>
                                            {<ControlLabel>Фазы {this.props.testStore.operationlist.operationInfo.phases}</ControlLabel>
                                             <FormControl componentClass="select" placeholder="select"  defaultValue={this.props.testStore.operationlist.operationInfo.phases[0].name}>
                                             {this.props.testStore.operationlist.listPhase.map((option, index) =>
                                             <option key={index} id={option.id}  ref="phaza" onChange={this.tooglePhases}>
                                             {option.name}
                                             </option>)}
                                             </FormControl>}
                                        </FormGroup> : "<div>...</div>"
                                        */}
                                    {(this.props.testStore.operationlist.listTechOperationUnits !== undefined) ?
                                        <FormGroup>
                                            <ControlLabel>activityTypeId</ControlLabel>
                                            <FormControl componentClass="select" placeholder="select" value={this.state.activityTypeId}>
                                                {this.props.testStore.operationlist.listActivityTypes.map((option, index) =>
                                                    <option key={index} /*selected={this.state.activityTypeId == option.id} */ id={option.id} ref="actyveType" >
                                                        {option.name}
                                                    </option>)}
                                            </FormControl>
                                        </FormGroup> : ""
                                    }
                                    {(this.props.testStore.operationlist.listTechOperationUnits !== undefined) ?
                                        <FormGroup>
                                            <ControlLabel>Измерения</ControlLabel>
                                            <FormControl componentClass="select" placeholder="select" value={this.state.techOperationUnitId}  onChange={this.handleChange} /*(e) => this.handleChange(e)onChange={this.handleChange('techOperationUnitId')}*/>
                                                {this.props.testStore.operationlist.listTechOperationUnits.map((option, index) =>
                                                    <option key={index} value={option.id} /*selected={this.state.techOperationUnitId == option.id}*/ id={option.id} ref="techOperationUnitId">
                                                        {option.name}
                                                    </option>)}
                                            </FormControl>
                                        </FormGroup> : ""
                                    }
                                    <Button bsStyle="success"  type="submit">Создать</Button>
                                </Form>
                            </Col>
                        </Row> : 'no'
                }
            </Grid>
        )
    }
}

export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({})
)(Home);