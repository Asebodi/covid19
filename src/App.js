import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Indonesia from "./Indonesia";
import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/indonesia-stats" exact component={Indonesia}/>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
