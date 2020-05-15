import React, { useEffect } from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { getMetadataRequest } from '@reducers/metadata';

import Routes from './Routes';
import Header from './components/main/header/Header';
import Footer from './components/main/footer/Footer';
import StaticFooter from './components/main/footer/StaticFooter';
import { SnapshotRenderer } from './components/export/SnapshotService';

const App = ({
  getMetadata,
}) => {
  useEffect(() => {
    getMetadata();
  });

  return (
    <Router>
      <Header />
      <Routes />
      <Switch>
        <Route path="/(about|contact)" component={StaticFooter} />
        <Route path="/" component={Footer} />
      </Switch>
      <SnapshotRenderer />
    </Router>
  );
};

const mapDispatchToProps = dispatch => ({
  getMetadata: () => dispatch(getMetadataRequest()),
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  getMetadata: PropTypes.func.isRequired,
};
