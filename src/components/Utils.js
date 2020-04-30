import React, { useState, useEffect } from "react";

import { genJSON, genJSON2 } from "./UtilFunctions";

import { cl, cubeMsgNext, obj } from "./_sharedFunctions";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import CircularProgress from "@material-ui/core/CircularProgress";
import localForage from "localforage";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Paper from "@material-ui/core/Paper";
import { CubeMsg } from "./3d/CubeMsg";

export const Utils = () => {
   //const isSelected = (name) => selected.indexOf(name) !== -1;

   const [cubeWrapperAnim, setCubeWrapperAnim] = useState([]),
      [init, setInit] = useState(false),
      [token, setToken] = useState("not yet"),
      [displayJSON, setDisplayJSON] = useState("displayNone"),
      [citiesValue, setCitiesValue] = useState("NA"),
      [spinnerDisplay, setSpinnerDisplay] = useState("displayBlock"),
      [msgArr, setMsgArr] = useState(obj);

   const startGenJSON = () => {
      genJSON(token).then(() => {
         setMsgArr(cubeMsgNext("JSON file updated", "info", msgArr));
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      });
   };
   const startGenJSON2 = () => {
      setSpinnerDisplay("displayBlock");
      setMsgArr(cubeMsgNext("Building alpha City files", "info", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      genJSON2(token).then(() => {
         setSpinnerDisplay("displayNone");
         setMsgArr(cubeMsgNext("JSON file updated", "info", msgArr));
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      });
   };
   const checkAppStats = () => {
      setSpinnerDisplay("displayBlock");
      setMsgArr(cubeMsgNext("Stats are not for demo", "warning", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      setTimeout(() => {
         setSpinnerDisplay("displayNone");
      }, 800);
   };
   const downloadCityJson = () => {
      window.open("./share/cities.json");
   };
   const displayCityJson = () => {
      setSpinnerDisplay("displayBlock");
      setDisplayJSON("displayBlock");
      setMsgArr(cubeMsgNext("Loading file....", "warning", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      ////
      fetch("./share/cities.json")
         .then((r) => r.text())
         .then((text) => {
            text = JSON.stringify(text)
               .toString()
               .replace(/\\/g, "")
               .replace("[", "")
               .replace("]", "")
               .replace(/city/g, "\n")
               .replace(/admin_name/g, "")
               .replace(/:/g, "")
               .replace(/,{/g, "")
               .replace(/}/g, "")
               .replace(/{/g, "")
               .replace(/"/g, "")
               .replace(/country/g, "");
            setCitiesValue(text);
         });

      setTimeout(() => {
         setSpinnerDisplay("displayNone");
         setDisplayJSON("displayBlock");
         setMsgArr(cubeMsgNext("File Loaded", "success", msgArr));
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      }, 1500);
   };
   useEffect(() => {
      if (init === false) {
         setMsgArr(cubeMsgNext("Loading ...", "info", msgArr));
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
         localForage
            .getItem("token")
            .then(function (startToken) {
               setToken(startToken);
               setMsgArr(cubeMsgNext("Utilities Loaded", "success", msgArr));
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );
               setInit(true);
               setTimeout(() => {
                  setSpinnerDisplay("displayNone");
               }, 400);
            })
            .catch(function (err) {
               // This code runs if there were any errors
               console.log(err);
               alert("no token found");
               window.location.href = "/login";
            });
      }
   }, []);

   return (
      <div id='main' className='body'>
         <h3>App Utilities</h3>
         <div style={{ padding: 25, display: "block" }}></div>
         <div className='contain' style={{ marginLeft: 10 }}>
            <div className={"cubeWrapperFluid " + cubeWrapperAnim} id='stage'>
               <CubeMsg
                  msgArr={msgArr}
                  width={"100%"}
                  height={78}
                  marginT={-60}
               />
            </div>
         </div>
         <div style={{ padding: 15, display: "block" }}></div>
         <div className={spinnerDisplay}>
            <CircularProgress />
         </div>
         <div style={{ padding: 15, display: "block" }}></div>
         <Paper>
            <List component='nav' aria-label='main mailbox folders'>
               <ListItem button onClick={() => startGenJSON()} disabled={true}>
                  <ListItemIcon>
                     <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary='Generate Single Cities File' />
               </ListItem>
               <ListItem button onClick={() => startGenJSON2()} disabled={true}>
                  <ListItemIcon>
                     <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText primary='Generate Alpha City Files' />
               </ListItem>
               <ListItem
                  button
                  onClick={() => displayCityJson()}
                  disabled={true}
               >
                  <ListItemIcon>
                     <VisibilityIcon />
                  </ListItemIcon>
                  <ListItemText primary='Display All Weather City JSON File' />
               </ListItem>

               <ListItem
                  button
                  onClick={() => downloadCityJson()}
                  disabled={true}
               >
                  <ListItemIcon>
                     <CloudDownloadIcon />
                  </ListItemIcon>
                  <ListItemText primary='Download Weather City (text)' />
               </ListItem>
               <ListItem button onClick={() => checkAppStats()}>
                  <ListItemIcon>
                     <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary='Check App Stats' />
               </ListItem>
            </List>
            <div className={displayJSON} style={{ padding: 10, width: "100%" }}>
               <TextField
                  id='outlined-multiline-flexible'
                  label='cities.txt'
                  multiline
                  fullWidth={true}
                  rowsMax={20}
                  value={citiesValue}
                  variant='outlined'
               />
            </div>
         </Paper>
      </div>
   );
};
