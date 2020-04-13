import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export const Msg = (props) => {
   let alertTitle = props.alertColor.replace(/^./, (str) => str.toUpperCase());
   //console.log('in msg');
   return (
      <div style={{ width: props.width }}>
         <div style={{ width: props.width }}>
            <Alert severity={props.alertColor} variant='filled'>
               <AlertTitle>{alertTitle}</AlertTitle>
               {props.msg}
            </Alert>
         </div>
      </div>
   );
};
