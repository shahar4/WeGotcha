import React, { Component  } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import ChooseHat from './ChooseHat';
import NewOfficeHours from './office_hours/NewOfficeHours';
import OfficeHoursCreated from './office_hours/OfficeHoursCreated';
import ChooseOfficeHours from './students/ChooseOfficeHours';

const Dashboard = () => <h2>Dashboard</h2>;

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
            <Route exact path="/office_hours/new" component={NewOfficeHours} />
            <Route exact path="/office_hours/created" component={OfficeHoursCreated} />
            <Route exact path="/students/choose_office_hours" component={ChooseOfficeHours} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
