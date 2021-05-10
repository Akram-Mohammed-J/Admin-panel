import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <ProtectedRoute exact path="/Admin" component={Admin} />
          <Route path="*">
            <div style={{ width: "100%", margin: "2rem auto" }}>
              <h4 style={{ textAlign: "center" }}>Page Does not Exist 404</h4>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
