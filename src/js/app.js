import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch, } from "react-router-dom";

import '../css/style.css';
import LanLegis from './lanlegis/lanlegis';

// add new condition under Route element

// :input and :output should be either 'direct', 'example' or 'both'
ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/lanlegis/:backend/:input/:output' component={LanLegis}/>
    </Switch>
      
  </Router>,
  document.getElementById("root")
)
