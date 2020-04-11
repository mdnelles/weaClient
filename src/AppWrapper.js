import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import localForage from 'localforage';

import { userIsLoggedIn } from './components/UserFunctions';
import './App.css';

import { Loading } from './components/Loading';
import { LogView } from './components/LogView';
import MiniDrawer from './components/widgets/MiniDrawer';
import { Statistics } from './components/Statistics';
import { Admin } from './components/Admin';
import { Countries } from './components/Countries';
import { Cities } from './components/Cities';

export const AppWrapper = () => {
   const [activeSession, setActiveSession] = useState('loading'),
      [drawerState, setDrawerState] = useState(false);

   const toggleDrawer = () => {
      setDrawerState(!drawerState);
   };

   useEffect(() => {
      console.log('AppWrapper useEffect');
      localForage
         .getItem('token', function (err, theToken) {
            if (err) {
               console.error('token err -> ' + err);
            } else {
               userIsLoggedIn(theToken)
                  .then((data) => {
                     // imported fun
                     if (data === true || data === 'true') {
                        setActiveSession('ok');
                     } else {
                        window.location.href = '/';
                     }
                  })
                  .catch((err) => {
                     console.log('user is not logged in ' + err);
                     window.location.href = '/';
                  });
            }
         })
         .catch((err) => {
            console.log('user is not logged in ' + err);
            window.location.href = '/';
         });
   }, []);

   var ret = '';
   if (activeSession === 'no') {
      ret = <Redirect to='/' />;
   } else if (activeSession === 'loading') {
      ret = <Route path='/' component={Loading} />;
   } else {
      ret = (
         <div>
            <MiniDrawer
               drawerState={drawerState}
               key={drawerState}
               toggleDrawer={toggleDrawer}
            />
            <div className='appHolder' style={{ marginLeft: 65 }}>
               <Route exact path='/admin' component={Admin} />
               <Route exact path='/cities' component={Cities} />
               <Route exact path='/countries' component={Countries} />
               <Route exact path='/logs' component={LogView} />
               <Route exact path='/stats' component={Statistics} />
            </div>
         </div>
      );
   }

   return ret;
};
