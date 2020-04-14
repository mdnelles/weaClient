import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

// AppWrapper protects Admin Panel from non sessioned access
import { AppWrapper } from './AppWrapper';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Loading } from './components/Loading';
class App extends Component {
   render() {
      const LoginContainer = () => (
         <div className='container'>
            <Route path='/login' component={Login} />
         </div>
      );

      return (
         <div className='App'>
            <Router>
               <Switch>
                  <Route exact path='/login' component={LoginContainer} />
                  <Route exact path='/home' component={Home} />
                  <Route exact path='/' component={Home} />
                  <Route exact path='/loading' component={Loading} />
                  <Route path='/' component={AppWrapper} />
               </Switch>
            </Router>
         </div>
      );
   }
}

export default App;
