import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import localForage from "localforage";
import { cl } from "./components/_sharedFunctions";

import { userIsLoggedIn } from "./components/UserFunctions";
import "./App.css";

import { LogView } from "./components/LogView";
import MiniDrawer from "./components/widgets/MiniDrawer";
import { Statistics } from "./components/Statistics";
import { ApiData } from "./components/ApiData";
import { Admin } from "./components/Admin";
import { Countries } from "./components/Countries";
import { Cities } from "./components/Cities";
import { States } from "./components/States";
import { Users } from "./components/Users";
import { Utils } from "./components/Utils";

const goHome = () => {
   // putting this in to stop repaid reloading of page on '/'
   let temp,
      loc = window.location.href.toString();
   if (loc.includes(3000)) {
      temp = loc.split("3000");
      if (!!temp[1] && temp[1].toString().length > 1) {
         window.location.href = "/login";
      }
   } else {
      // this is for prodcution if it is residing on a domain
      loc = loc.replace("https://", "").replace("http://", "");
      if (loc.includes("/")) {
         temp = loc.split("/");
         if (!!temp[1] && temp[1].toString().length > 1) {
            window.location.href = "/";
         }
      }
   }
};

export const AppWrapper = () => {
   const [activeSession, setActiveSession] = useState("loading"),
      [drawerState, setDrawerState] = useState(false);

   const toggleDrawer = () => {
      setDrawerState(!drawerState);
   };

   useEffect(() => {
      // pnl
      localForage
         .getItem("token", function (err, theToken) {
            if (err) {
               cl("token err -> " + err);
            } else {
               userIsLoggedIn(theToken)
                  .then((data) => {
                     data === true || data === "true"
                        ? setActiveSession("ok")
                        : goHome();
                  })
                  .catch((err) => {
                     cl("user is not logged in " + err);
                     goHome();
                  });
            }
         })
         .catch((err) => {
            cl("user is not logged in " + err);
            goHome();
         });
   }, []);

   var ret = "";
   if (activeSession === "no") {
      cl("AppWRapper.js.no active session routing to login page");
      ret = <Redirect to='/login' />;
   } else {
      ret = (
         <div className='adminClass'>
            <MiniDrawer
               drawerState={drawerState}
               key={drawerState}
               toggleDrawer={toggleDrawer}
            />
            <div className='appHolder' style={{ marginLeft: 65 }}>
               <Route exact path='/admin' component={Admin} />
               <Route exact path='/cities' component={Cities} />
               <Route exact path='/states' component={States} />
               <Route exact path='/countries' component={Countries} />
               <Route exact path='/logs' component={LogView} />
               <Route exact path='/utils' component={Utils} />
               <Route exact path='/stats' component={Statistics} />
               <Route exact path='/users' component={Users} />
               <Route exact path='/apidata' component={ApiData} />
            </div>
         </div>
      );
   }

   return ret;
};
