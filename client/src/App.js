import React, { Component } from 'react';
import Layout from './components/Layout';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Bar from './pages/Bar';
import Line from './pages/Line';
import Pie from './pages/Pie';
import Showcase from './pages/Showcase';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/bar" component={Bar} />
          <Route path="/line" component={Line} />
          <Route path="/pie" component={Pie} />
          <Route path="/showcase" component={Showcase} />
        </Layout>
      </Router>
    );
  }
}

export default App;
