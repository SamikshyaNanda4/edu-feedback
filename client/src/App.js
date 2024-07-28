import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Feedback from './components/Feedback';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/feedback" component={Feedback} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

