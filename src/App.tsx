import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import TaskList from "./components/Tasks/TaskList";
import { AuthProvider } from "./contexts/AuthContext";

import './App.css';

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/tasks" component={TaskList} />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
