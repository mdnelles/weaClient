import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { ThemeProvider } from "@material-ui/core/styles";

import "./App.css";

// AppWrapper protects Admin Panel from non sessioned access
import { AppWrapper } from "./AppWrapper";
import { Forcast } from "./components/Forcast";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Loading } from "./components/Loading";
import { Index } from "./components/Index";

const theme = createMuiTheme({
   palette: {
      primary: lightBlue,
      secondary: blue,
   },
});

const App = () => {
   const LoginContainer = () => (
      <div className='container'>
         <Route path='/login' component={Login} />
      </div>
   );

   return (
      <div className='App'>
         <ThemeProvider theme={theme}>
            <Router>
               <Switch>
                  <Route exact path='/login' component={LoginContainer} />
                  <Route exact path='/home' component={Home} />
                  <Route exact path='/forcast/:qry/:qry' component={Forcast} />
                  <Route exact path='/' component={Index} />
                  <Route exact path='/loading' component={Loading} />
                  <Route exact path='/admin' component={AppWrapper} />
                  <Route exact path='/cities' component={AppWrapper} />
                  <Route exact path='/states' component={AppWrapper} />
                  <Route exact path='/countries' component={AppWrapper} />
                  <Route exact path='/logs' component={AppWrapper} />
                  <Route exact path='/utils' component={AppWrapper} />
                  <Route exact path='/stats' component={AppWrapper} />
                  <Route exact path='/users' component={AppWrapper} />
                  <Route exact path='/apidata' component={AppWrapper} />
               </Switch>
            </Router>
         </ThemeProvider>
      </div>
   );
};

export default App;
