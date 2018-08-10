import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import ChooseHat from './ChooseHat';
import NewOfficeHours from './office_hours/NewOfficeHours';
import OfficeHoursCreated from './office_hours/OfficeHoursCreated';
import ChooseOfficeHours from './students/ChooseOfficeHours';
import JoinedQueue from './students/JoinedQueue';
import TAOptions from './TAs/TAOptions';
import ManageOfficeHours from './TAs/ManageOfficeHours';

const Dashboard = () => <h2>Flumpert</h2>;

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOfficeHoursList();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/chooseHat" component={ChooseHat} />
            <Route exact path="/ta/office_hours/new" component={NewOfficeHours} />
            <Route exact path="/office_hours/created" component={OfficeHoursCreated} />
            <Route exact path="/students/choose_office_hours" component={ChooseOfficeHours} />
            <Route exact path="/students/queue_joined" component={JoinedQueue} />
            <Route exact path="/ta/options" component={TAOptions} />
            <Route exact path="/ta/office_hours/manage" component={ManageOfficeHours} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { 
    studentName: state.activeUser ? state.activeUser.name.givenName : '',
    course: state.activeUser ? state.activeUser.office_hours_joined : '',
  };
}

export default connect(mapStateToProps, actions)(App);
