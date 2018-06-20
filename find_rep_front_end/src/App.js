import React, { Component } from 'react';
import {SearchResults} from './component/SearchResults/SearchResults.js';
import './App.css';


const STATES = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','GU','HI','IA','ID', 'IL','IN','KS','KY','LA','MA','MD','ME','MH','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY', 'OH','OK','OR','PA','PR','PW','RI','SC','SD','TN','TX','UT','VA','VI','VT','WA','WI','WV','WY'];

function renderStateOptions(state, i) {
  return (
      <option key={i} value={state}>{state}</option>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        repTypeValue: '',
        stateValue: '',
        stateDisabled: true,
        submitDisabled: true,
        submitUrl: ''
    };

    this.handleRepTypeChange = this.handleRepTypeChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRepTypeChange(event) {
      this.setState({repTypeValue: event.target.value});
      if (event.target.value !== ''){
          this.setState({stateDisabled: false});
      } else {
          this.setState({stateDisabled: true});
          this.setState({submitDisabled: true});
      }
  }

  handleStateChange(event) {
      this.setState({stateValue: event.target.value});
      if (event.target.value !== ''){
          this.setState({submitDisabled: false});
      } else {
          this.setState({submitDisabled: true});
      }
  }

  handleSubmit(event) {
      var url = 'http://localhost:3000/' + this.state.repTypeValue + '/' + this.state.stateValue + '/';
      this.setState({submitUrl: url});
  }

  render() {
    return (
      <div className="App">
        <div className="app-main-container">
          <h1>Who's My Representative?</h1>
          <hr></hr>
          <div className='nav-container'>
              <div className='row'>
                  <div className='col-xs-2'>
                      <select id='rep_select' className='col-xs-2 form-control' value={this.state.repTypeValue} onChange={this.handleRepTypeChange}>
                          <option value=''>Select One</option>
                          <option value='senators'>Senators</option>
                          <option value='representatives'>Representatives</option>
                      </select>
                  </div>
                  <div className='col-xs-2'>
                      <select id='state_select'  className='col-xs-2 form-control' disabled={this.state.stateDisabled} value={this.state.stateValue} onChange={this.handleStateChange}>
                          <option value=''>Select One</option>
                          {STATES.map(renderStateOptions)}
                      </select>
                  </div>
                  <div className='col-xs-1'>
                      <button id='search_btn' className='btn btn-primary' disabled={this.state.submitDisabled} onClick={this.handleSubmit}>Search</button>
                  </div>
              </div>
          </div>
          <div className="row">
            <SearchResults submitUrl={this.state.submitUrl} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
