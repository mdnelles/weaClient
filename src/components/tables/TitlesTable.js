import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { updateFunctionDeclaration } from 'typescript';
import uuid from 'uuid';

const useStyles = makeStyles({
   table: {
      minWidth: 650,
   },
});

export const TitlesTable = (props) => {
   const classes = useStyles();

   let rows = props.titleData;
   return (
      <div>
         <Table
            className={classes.table}
            size='small'
            aria-label='a dense table'
         >
            <TableHead>
               <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>
                     Employee Titles
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row) => (
                  <TableRow key={uuid()}>
                     <TableCell>{row.title}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};
