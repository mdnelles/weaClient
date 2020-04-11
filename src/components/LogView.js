import React, { useState, useEffect } from 'react';
import { getLogs } from './LogFunctions';
import localForage from 'localforage';

import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

const headCells = [
   { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
   { id: 'code', numeric: true, disablePadding: true, label: 'Code' },
   {
      id: 'filename',
      numeric: false,
      disablePadding: false,
      label: 'Filename',
   },
   {
      id: 'msg_programmer',
      numeric: false,
      disablePadding: false,
      label: 'Msg',
   },
   { id: 'msg_app', numeric: false, disablePadding: false, label: 'Msg(a)' },
   { id: 'refer', numeric: false, disablePadding: false, label: 'Refer' },
   { id: 'tdate', numeric: false, disablePadding: false, label: 'Date' },
];

/* -- */

function EnhancedTableHead(props) {
   const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
   } = props;
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
   };

   return (
      <TableHead>
         <TableRow>
            <TableCell padding='checkbox'>
               <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
               />
            </TableCell>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'desc'}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                           {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                        </span>
                     ) : null}
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
}

EnhancedTableHead.propTypes = {
   classes: PropTypes.object.isRequired,
   numSelected: PropTypes.number.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   onSelectAllClick: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
   root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
   },
   highlight:
      theme.palette.type === 'light'
         ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
           }
         : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
           },
   title: {
      flex: '1 1 100%',
   },
}));

const EnhancedTableToolbar = (props) => {
   const classes = useToolbarStyles();
   const { numSelected } = props;

   return (
      <Toolbar
         className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
         })}
      >
         {numSelected > 0 ? (
            <Typography
               className={classes.title}
               color='inherit'
               variant='subtitle1'
               component='div'
            >
               {numSelected} selected
            </Typography>
         ) : (
            <Typography
               className={classes.title}
               variant='h6'
               id='tableTitle'
               component='div'
            >
               Logs
            </Typography>
         )}

         {numSelected > 0 ? (
            <Tooltip title='Delete'>
               <IconButton
                  aria-label='delete'
                  onClick={() => props.deleteHandler()}
               >
                  <DeleteIcon />
               </IconButton>
            </Tooltip>
         ) : (
            <Tooltip title='Filter list'>
               <IconButton aria-label='filter list'>
                  <FilterListIcon />
               </IconButton>
            </Tooltip>
         )}
      </Toolbar>
   );
};

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
   },
   table: {
      minWidth: 750,
   },
   visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
   },
}));

export const LogView = () => {
   const classes = useStyles();

   const [rows, setRows] = useState([]),
      [order, setOrder] = React.useState('asc'),
      [orderBy, setOrderBy] = React.useState('tdate'),
      [selected, setSelected] = React.useState([]),
      [page, setPage] = React.useState(0),
      [dense, setDense] = React.useState(false),
      [rowsPerPage, setRowsPerPage] = React.useState(5),
      [msgArr, setMsgArr] = useState(obj),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   useEffect(() => {
      localForage
         .getItem('token')
         .then(function (startToken) {
            getLogs(startToken).then((data) => {
               setRows(data);
            });
         })
         .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, []);

   const deleteHandler = () => {
      setMsgArr(cubeMsgNext('Delete Logs not enabled', 'warning', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
   };

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = rows.map((n) => n.name);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   const handleClick = (id) => {
      console.log('id: ' + id);
      //console.log('event.target.id: ' + event.target.id);
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
         );
      }
      setSelected(newSelected);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangeDense = (event) => {
      setDense(event.target.checked);
   };

   //const isSelected = (name) => selected.indexOf(name) !== -1;
   const isSelected = (id) => selected.indexOf(id) !== -1;

   const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

   return (
      <div id='main' className='body'>
         <h3>Log Views</h3>
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
         <div className={classes.root}>
            <Paper className={classes.paper}>
               <EnhancedTableToolbar
                  numSelected={selected.length}
                  deleteHandler={deleteHandler}
               />
               <TableContainer>
                  <Table
                     className={classes.table}
                     aria-labelledby='tableTitle'
                     size={dense ? 'small' : 'medium'}
                     aria-label='enhanced table'
                  >
                     <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                     />
                     <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                           .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                 <TableRow
                                    hover
                                    onClick={() => handleClick(row.id)}
                                    role='checkbox'
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    id={row.id}
                                    selected={isItemSelected}
                                 >
                                    <TableCell padding='checkbox'>
                                       <Checkbox
                                          checked={isItemSelected}
                                          inputProps={{
                                             'aria-labelledby': labelId,
                                          }}
                                       />
                                    </TableCell>
                                    <TableCell
                                       component='th'
                                       id={labelId}
                                       scope='row'
                                       padding='none'
                                    >
                                       {row.id}
                                    </TableCell>
                                    <TableCell align='right'>
                                       {row.code}
                                    </TableCell>
                                    <TableCell align='right'>
                                       {row.filename}
                                    </TableCell>
                                    <TableCell align='right'>
                                       {row.msg_programmer}
                                    </TableCell>
                                    <TableCell align='right'>
                                       {row.msg_app}
                                    </TableCell>
                                    <TableCell align='right'>
                                       {row.refer}
                                    </TableCell>
                                    <TableCell align='right'>
                                       {row.tdate}
                                    </TableCell>
                                 </TableRow>
                              );
                           })}
                        {emptyRows > 0 && (
                           <TableRow
                              style={{ height: (dense ? 33 : 53) * emptyRows }}
                           >
                              <TableCell colSpan={6} />
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
               />
            </Paper>
            <FormControlLabel
               control={<Switch checked={dense} onChange={handleChangeDense} />}
               label='Dense padding'
            />
         </div>
      </div>
   );
};
