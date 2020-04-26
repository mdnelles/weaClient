import React, { useState, useEffect } from "react";
import { getAPIData } from "./ApiDataFunctions";
import localForage from "localforage";
import uuid from "uuid";

import { cubeMsgNext, obj } from "./_sharedFunctions";
import { CubeMsg } from "./3d/CubeMsg";
import { JSONReader } from "./widgets/JSONReader";

import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

const headCells = [
   { id: "id", numeric: true, disablePadding: true, label: "ID" },
   { id: "code", numeric: true, disablePadding: true, label: "Code" },
   {
      id: "filename",
      numeric: false,
      disablePadding: false,
      label: "Filename",
   },
   {
      id: "msg_programmer",
      numeric: false,
      disablePadding: false,
      label: "Msg",
   },
   { id: "msg_app", numeric: false, disablePadding: false, label: "Msg(a)" },
   { id: "refer", numeric: false, disablePadding: false, label: "Refer" },
   { id: "tdate", numeric: false, disablePadding: false, label: "Date" },
];

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
                  inputProps={{ "aria-label": "select all desserts" }}
               />
            </TableCell>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : "desc"}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                           {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
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
   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
   root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
   },
   highlight:
      theme.palette.type === "light"
         ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
           }
         : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
           },
   title: {
      flex: "1 1 100%",
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
      width: "100%",
   },
   paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
   },
   table: {
      minWidth: 750,
   },
   visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
   },
}));

export const ApiData = () => {
   const classes = useStyles();

   const [rows, setRows] = useState([]),
      [isLoaded, setIsLoaded] = React.useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [page, setPage] = React.useState(0),
      [token, setToken] = useState("na"),
      [jsonLon, setJsonLon] = useState(""),
      [jsonLat, setJsonLat] = useState(""),
      [jsonTdate, setJsonTdate] = useState(""),
      [open, setOpen] = React.useState(false),
      [dialogProgress, setDialogProgress] = useState("displayNone"),
      [dialogTitle, setDialogTitle] = useState(""),
      [dialogContent, setDialogContent] = useState(""),
      [rowsPerPage, setRowsPerPage] = React.useState(10),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const placeholder = (ev) => {
      // this does nothing
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const loadJSON = (city, lon, lat, tdate) => {
      setOpen(true);
      setDialogProgress("displayBlock");
      setDialogTitle("JSON weather data for " + city);
      setJsonLon(lon);
      setJsonLat(lat);
      setJsonTdate(tdate);
      console.log("/////////" + tdate);
   };

   useEffect(() => {
      setMsgArr(cubeMsgNext("loading Api Data", "info", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      if (isLoaded === false) {
         localForage
            .getItem("token")
            .then(function (startToken) {
               setToken(startToken);
               getAPIData(startToken).then((data) => {
                  setRows(data[0]);
                  setIsLoaded(true);
                  setMsgArr(cubeMsgNext("Countries loaded", "success", msgArr));
                  setCubeWrapperAnim(
                     msgArr[msgArr.findIndex((el) => el.current === true)].anim
                  );
               });
            })
            .catch(function (err) {
               // This code runs if there were any errors
               console.log(err);
               alert("no token found");
               window.location.href = "/";
            });
      }
   }, [isLoaded]);

   return (
      <div id='main' className='body'>
         <h3>Countries</h3>
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
         {isLoaded === false ? (
            <CircularProgress />
         ) : (
            <Paper>
               <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>location</TableCell>
                           <TableCell>Date</TableCell>
                           <TableCell>Lon</TableCell>
                           <TableCell>Lat</TableCell>
                           <TableCell>Commands</TableCell>
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
                                 <TableRow key={uuid()}>
                                    <TableCell>
                                       {row.ci + "," + row.ps + "," + row.co}
                                    </TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.lon}</TableCell>
                                    <TableCell>{row.lat}</TableCell>
                                    <TableCell>
                                       <ButtonGroup
                                          size='small'
                                          color='primary'
                                          variant='contained'
                                          aria-label='small primary button group'
                                       >
                                          <Button>
                                             <span
                                                onClick={() =>
                                                   loadJSON(
                                                      row.ci,
                                                      row.lon,
                                                      row.lat,
                                                      row.date
                                                   )
                                                }
                                                id={row.tdate}
                                             >
                                                View
                                             </span>
                                          </Button>

                                          <Button
                                             onClick={(event) =>
                                                placeholder(event)
                                             }
                                          >
                                             Delete
                                          </Button>
                                       </ButtonGroup>
                                    </TableCell>
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
         )}
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            maxWidth='lg'
            aria-describedby='alert-dialog-description'
         >
            <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
            <DialogContent>
               <span className={dialogProgress}>
                  <CircularProgress />
               </span>
               <JSONReader
                  lon={jsonLon}
                  lat={jsonLat}
                  tdate={jsonTdate}
                  token={token}
                  setDialogProgress={setDialogProgress}
               />
            </DialogContent>
         </Dialog>
      </div>
   );
};
