import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import uuid from 'uuid';
import _ from 'lodash';

const useStyles = makeStyles({
   root: {
      width: '100%',
   },
   container: {
      maxHeight: 440,
   },
});

export const SalaryTable = (props) => {
   const classes = useStyles();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   if (_.isEmpty(props.rowsData)) {
      console.log('_' + _.isEmpty(props.rowsData));
      return (
         <div>
            <br></br>Please select a salary range
         </div>
      );
   } else {
      let rows = props.rowsData;
      //let rows = props.rowsData;
      return (
         <div style={{ paddingTop: 10 }}>
            <Paper className={classes.root}>
               <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label='sticky table'>
                     <TableHead>
                        <TableRow>
                           {props.tableColumns.map((column) => (
                              <TableCell
                                 key={column.id}
                                 style={{ minWidth: column.minWidth }}
                              >
                                 {column.title}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {rows
                           .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           .map((row) => {
                              return (
                                 <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={uuid()}
                                 >
                                    {props.tableColumns.map((column) => {
                                       const value = row[column.id];
                                       return (
                                          <TableCell
                                             key={uuid()}
                                             align={props.tableColumns.align}
                                          >
                                             {column.format &&
                                             typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                          </TableCell>
                                       );
                                    })}
                                 </TableRow>
                              );
                           })}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component='div'
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
               />
            </Paper>
         </div>
      );
   }
};
