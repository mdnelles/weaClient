import React, { useState, useEffect } from 'react';

import { genJSON } from './UtilFunctions';

import { cl, cubeMsgNext, obj } from './_sharedFunctions';

import localForage from 'localforage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Paper from '@material-ui/core/Paper';
import { CubeMsg } from './3d/CubeMsg';

import PropTypes from 'prop-types';

export const Utils = () => {
   //const isSelected = (name) => selected.indexOf(name) !== -1;

   const [cubeWrapperAnim, setCubeWrapperAnim] = useState([]),
      [token, setToken] = useState('not yet'),
      [msgArr, setMsgArr] = useState(obj);

   const startGenJSON = () => {
      genJSON(token).then((res) => {
         setMsgArr(cubeMsgNext('JSON file updated', 'info', msgArr));
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      });
   };
   useEffect(() => {
      setMsgArr(cubeMsgNext('Loading ...', 'info', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      localForage
         .getItem('token')
         .then(function (startToken) {
            setToken(startToken);
            setMsgArr(cubeMsgNext('Utilities Loaded', 'success', msgArr));
            setCubeWrapperAnim(
               msgArr[msgArr.findIndex((el) => el.current === true)].anim
            );
         })
         .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
            alert('no token found');
            window.location.href = '/login';
         });
   }, []);

   return (
      <div id='main' className='body'>
         <h3>App Utilities</h3>
         <div style={{ padding: 25, display: 'block' }}></div>
         <div className='contain' style={{ marginLeft: 10 }}>
            <div className={'cubeWrapperFluid ' + cubeWrapperAnim} id='stage'>
               <CubeMsg
                  msgArr={msgArr}
                  width={'100%'}
                  height={78}
                  marginT={-60}
               />
            </div>
         </div>
         <div style={{ padding: 15, display: 'block' }}></div>
         <Paper>
            <List component='nav' aria-label='main mailbox folders'>
               <ListItem button onClick={() => startGenJSON()}>
                  <ListItemIcon>
                     <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary='Generate JSON city file' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon>
                     <CloudDownloadIcon />
                  </ListItemIcon>
                  <ListItemText primary='Download Weather City Static File' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon>
                     <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary='Check App Stats' />
               </ListItem>
            </List>
         </Paper>
      </div>
   );
};
