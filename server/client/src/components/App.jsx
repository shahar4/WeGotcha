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

const Dashboard = () => <h2>Flumpert</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOfficeHoursList();
    if (this.props.courseName) {
      this.props.checkPlaceInLine(this.props.courseName, this.props.studentName);
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/chooseHat" component={ChooseHat} />
            <Route exact path="/office_hours/new" component={NewOfficeHours} />
            <Route exact path="/office_hours/created" component={OfficeHoursCreated} />
            <Route exact path="/students/choose_office_hours" component={ChooseOfficeHours} />
            <Route exact path="/students/queue_joined" component={JoinedQueue} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { 
    studentName: state.activeUser ? state.activeUser.name.givenName : '',
    courseName: state.chosenOfficeHourName.value,
  };
}

export default connect(null, actions)(App);
