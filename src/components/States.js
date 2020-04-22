import React, { useState, useEffect } from "react";
import { getAPIData, getStates, addState, editState } from "./StateFunctions";
import localForage from "localforage";
import _ from "lodash";

import { cl, cubeMsgNext, obj } from "./_sharedFunctions";
import { CubeMsg } from "./3d/CubeMsg";

import PropTypes from "prop-types";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { lighten, makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

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

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />;
});

export const States = () => {
   const [state, setState] = React.useState({}),
      [dialogueCircular, setDialogueCircular] = useState("displayNone"),
      [msgArr, setMsgArr] = useState(obj),
      [apiInfo, setApiInfo] = useState(""),
      [open, setOpen] = React.useState(false),
      [token, setToken] = useState("na"),
      [gotStates, setGotStates] = useState(false),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const getJSONInfo = (rowData) => {
      setMsgArr(cubeMsgNext("This is not available for demo", "info", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
   };
   const handleClose = () => {
      setOpen(false);
      setDialogueCircular("displayNone");
   };

   useEffect(() => {
      setMsgArr(cubeMsgNext("Loading States", "info", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      if (gotStates === false) {
         localForage
            .getItem("token")
            .then(function (startToken) {
               setToken(startToken);
               getStates(startToken).then((data) => {
                  setState({
                     columns: [
                        { title: "ID", field: "id" },
                        { title: "Code", field: "state_code" },
                        { title: "State", field: "state_name" },
                        { title: "State (ASCII)", field: "state_name_ascii" },
                        { title: "Country", field: "country_code" },
                        {
                           title: "Flag",
                           field: "avatar",
                           render: (rowData) => (
                              <img
                                 style={{
                                    height: 22,
                                    width: 41,
                                    borderRadius: 2,
                                 }}
                                 src={
                                    "/img/flags/" +
                                    rowData.country_code +
                                    ".png"
                                 }
                              />
                           ),
                        },
                     ],
                     data: data,
                  });
                  setGotStates(true);
                  setMsgArr(cubeMsgNext("States Loaded", "success", msgArr));
                  setCubeWrapperAnim(
                     msgArr[msgArr.findIndex((el) => el.current === true)].anim
                  );
               });
            })
            .catch(function (err) {
               // This code runs if there were any errors
               console.log(err);
               alert("no token found");
               window.location.href = "/login";
            });
      }
   }, [state]);

   return (
      <div id='main' className='body'>
         <h3>States</h3>
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
         {_.isEmpty(state) ? (
            <CircularProgress />
         ) : (
            <MaterialTable
               actions={[
                  {
                     icon: "save_alt",
                     tooltip: "Show Subsiquent Cities",
                     onClick: (event, rowData) => {
                        getJSONInfo(rowData);
                     },
                  },
               ]}
               title='States and codes'
               columns={state.columns}
               data={state.data}
               editable={{
                  onRowAdd: (newData) =>
                     new Promise((resolve) => {
                        addState(token, newData).then((newUuid) => {
                           newData.id = newUuid;
                           resolve();
                           setState((prevState) => {
                              const data = [...prevState.data];
                              console.log(newData);
                              data.push(newData);
                              return { ...prevState, data };
                           });
                           setMsgArr(
                              cubeMsgNext("State addded.", "success", msgArr)
                           );
                           setCubeWrapperAnim(
                              msgArr[
                                 msgArr.findIndex((el) => el.current === true)
                              ].anim
                           );
                        }, 600);
                     }),
                  onRowUpdate: (newData, oldData) =>
                     new Promise((resolve) => {
                        //setTimeout(() => {
                        editState(token, newData).then(() => {
                           resolve();
                           if (oldData) {
                              setState((prevState) => {
                                 const data = [...prevState.data];
                                 data[data.indexOf(oldData)] = newData;
                                 return { ...prevState, data };
                              });
                              setMsgArr(
                                 cubeMsgNext(
                                    "State updated.",
                                    "success",
                                    msgArr
                                 )
                              );
                              setCubeWrapperAnim(
                                 msgArr[
                                    msgArr.findIndex(
                                       (el) => el.current === true
                                    )
                                 ].anim
                              );
                           }
                        }, 600);
                     }),
                  onRowDelete: (oldData) =>
                     new Promise((resolve) => {
                        setTimeout(() => {
                           resolve();
                           setState((prevState) => {
                              setMsgArr(
                                 cubeMsgNext(
                                    "State removed.",
                                    "success",
                                    msgArr
                                 )
                              );
                              setCubeWrapperAnim(
                                 msgArr[
                                    msgArr.findIndex(
                                       (el) => el.current === true
                                    )
                                 ].anim
                              );
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                           });
                           setMsgArr(
                              cubeMsgNext("State removed.", "success", msgArr)
                           );
                           setCubeWrapperAnim(
                              msgArr[
                                 msgArr.findIndex((el) => el.current === true)
                              ].anim
                           );
                        }, 600);
                     }),
               }}
            />
         )}
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
         >
            <DialogTitle id='alert-dialog-slide-title'>
               {"API Weather Info"}
            </DialogTitle>
            <DialogContent>
               <div className={dialogueCircular}>
                  <CircularProgress />
                  <br />
                  Loading
               </div>
               {apiInfo}
            </DialogContent>
         </Dialog>
      </div>
   );
};
