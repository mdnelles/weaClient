import React, { useState, useEffect } from "react";
import { getUsers, removeUser, addUser, editUser } from "./UserFunctions";
import localForage from "localforage";
import uuid from "uuid";

import { cubeMsgNext, obj } from "./_sharedFunctions";
import { CubeMsg } from "./3d/CubeMsg";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import MaterialTable from "material-table";

export const Users = () => {
   const [open, setOpen] = useState(false),
      [token, setToken] = useState("no token"),
      [email, setEmail] = useState(""),
      [password, setPassword] = useState(""),
      [firstName, setFirstName] = useState(""),
      [reset, setReset] = useState(false),
      [lastName, setLastName] = useState(""),
      [msgArr, setMsgArr] = useState(obj),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const [state, setState] = useState({ columns: [], data: [] });

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const clearUndefined = (str) => {
      if (str === undefined || str === "") {
         str = "NA";
         return str;
      }
   };
   const addUserStart = () => {
      //setSpinnerClass('displayBlock');
      setMsgArr(cubeMsgNext("Adding User to Database...", "success", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );

      setFirstName(clearUndefined(firstName));
      setLastName(clearUndefined(lastName));
      setEmail(clearUndefined(email));
      setPassword(clearUndefined(password));

      var id = uuid();
      var newUser = {
         uuid: id,
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: password,
      };
      setOpen(false);
      addUser(newUser, token).then((res) => {
         getUsers(token).then((data) => {
            console.log(data);
            //setUsers(data);
            setReset(!reset);
         });

         setEmail(""); // clear values
         setPassword("");
         setFirstName("");
         setLastName("");
         //setSpinnerClass('displayNone');
         setMsgArr(
            cubeMsgNext("New entry added to database", "success", msgArr)
         );
         // find number of next up slide and then update state of Cube Wrapper to trigger roll
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      });
   };

   // this is to remove the ADD button because in some cases we don't want to add a value
   const removeAdd = () => {
      var node = document.querySelector('[title="Add"]');
      if (typeof node && node !== null && node !== undefined) {
         node.remove();
      }
   };

   useEffect(() => {
      setMsgArr(cubeMsgNext("Loading Users", "info", msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      localForage
         .getItem("token")
         .then(function (theToken) {
            setToken(theToken);
            getUsers(theToken).then((data) => {
               setMsgArr(cubeMsgNext("Users Loaded", "success", msgArr));
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );
               //setUsers(data);
               setTimeout(() => {
                  removeAdd();
               }, 2000);

               setState({
                  columns: [
                     { title: "Email", field: "email" },
                     { title: "First Name", field: "first_name" },
                     { title: "Last Name", field: "last_name" },
                     { title: "Last Seen", field: "last_login" },
                  ],
                  data: data,
               });
            });
         })

         .catch(function (err) {
            console.log(err);
            alert("no token found");
            window.location.href = "/";
         });
   }, [reset, msgArr]);

   return (
      <div id='main' className='body'>
         <h3>Administrative Users</h3>
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
         <Button variant='contained' color='primary' onClick={handleClickOpen}>
            Add New User
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
         >
            <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
            <DialogContent>
               <DialogContentText>Add New User</DialogContentText>
               <TextField
                  autoFocus
                  margin='dense'
                  defaultValue={email}
                  id='email'
                  label='Email Address'
                  type='email'
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='password'
                  label='password'
                  type='password'
                  defaultValue={password}
                  fullWidth
                  onChange={(event) => setPassword(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='firstName'
                  label='First Name'
                  type='text'
                  defaultValue={firstName}
                  fullWidth
                  onChange={(event) => setFirstName(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='lastName'
                  label='Last Name'
                  defaultValue={lastName}
                  type='text'
                  fullWidth
                  onChange={(event) => setLastName(event.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleClose}
                  color='primary'
                  variant='contained'
               >
                  Cancel
               </Button>
               <Button
                  onClick={addUserStart}
                  color='primary'
                  variant='contained'
               >
                  Save New User
               </Button>
            </DialogActions>
         </Dialog>
         <br />
         <br />

         <MaterialTable
            title='App Admin Users'
            columns={state.columns}
            data={state.data}
            editable={{
               onRowAdd: (newData) =>
                  new Promise((resolve) => {
                     setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                           const data = [...prevState.data];
                           data.push(newData);
                           return { ...prevState, data };
                        });
                     }, 600);
                  }),
               onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                     //setTimeout(() => {
                     editUser(newData, token).then((res) => {
                        resolve();
                        setMsgArr(
                           cubeMsgNext(
                              "New entry added to database",
                              "success",
                              msgArr
                           )
                        );
                        // find number of next up slide and then update state of Cube Wrapper to trigger roll
                        setCubeWrapperAnim(
                           msgArr[msgArr.findIndex((el) => el.current === true)]
                              .anim
                        );
                        if (oldData) {
                           setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                           });
                        }
                     });
                  }),
               onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                     console.log("Old Data");
                     console.log(oldData.email);
                     if (
                        oldData.email === "mxnelles@gmail.com" ||
                        oldData.email === "demo"
                     ) {
                        setMsgArr(
                           cubeMsgNext(
                              "That admin account can not be deleted",
                              "warning",
                              msgArr
                           )
                        );
                        resolve();
                        setCubeWrapperAnim(
                           msgArr[msgArr.findIndex((el) => el.current === true)]
                              .anim
                        );
                     } else {
                        removeUser(oldData.id, token).then(() => {
                           setMsgArr(
                              cubeMsgNext("Removed user", "Success", msgArr)
                           );
                           setCubeWrapperAnim(
                              msgArr[
                                 msgArr.findIndex((el) => el.current === true)
                              ].anim
                           );
                           resolve();
                           setState((prevState) => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                           });
                        });
                     }
                  }),
            }}
         />
      </div>
   );
};
