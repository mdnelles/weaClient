import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { ThemeProvider } from '@material-ui/core/styles';

import './App.css';

// AppWrapper protects Admin Panel from non sessioned access
import { AppWrapper } from './AppWrapper';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Loading } from './components/Loading';

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
                  <Route exact path='/' component={Home} />
                  <Route exact path='/loading' component={Loading} />
                  <Route path='/' component={AppWrapper} />
               </Switch>
            </Router>
         </ThemeProvider>
      </div>
   );
};

export default App;
