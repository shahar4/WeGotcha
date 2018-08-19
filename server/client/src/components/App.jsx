import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import ChooseHat from './ChooseHat';
import NewOfficeHours from './office_hours/NewOfficeHours';
import OfficeHoursCreated from './office_hours/OfficeHoursCreated';
import ChooseOfficeHours from './students/ChooseOfficeHours';
import TAOptions from './TAs/TAOptions';
import ManageOfficeHours from './TAs/ManageOfficeHours';
import ShowQueue from './students/ShowQueue';

class App extends Component {
  //only do the below if user is signed in
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOfficeHoursList();
    this.props.fetchStudentOhJoind();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={ChooseHat} />
            <Route exact path="/chooseHat" component={ChooseHat} />
            <Route exact path="/ta/office_hours/new" component={NewOfficeHours} />
            <Route exact path="/office_hours/created" component={OfficeHoursCreated} />
            <Route exact path="/students/choose_office_hours" component={ChooseOfficeHours} />
            <Route exact path="/students/see_queue" component={ShowQueue} />
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
    course: state.activeUser ? state.activeUser.officeHoursJoined : '',
    userHat: state.hat,
  };
}

export default connect(mapStateToProps, actions)(App);