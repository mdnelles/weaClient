import React, { useState, useEffect } from "react";
import { login } from "./UserFunctions";
import localForage from "localforage";
import { CubeMsg } from "./3d/CubeMsg";
import { cubeMsgNext, obj } from "./_sharedFunctions";

import { useSpring, animated as a } from "react-spring";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 345,
   },
   media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
   },
   expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: "rotate(180deg)",
   },
   avatar: {
      backgroundColor: red[500],
   },
   typography: {
      padding: theme.spacing(2),
   },
}));

export const Home = () => {
   const classes = useStyles();

   const [email, setEmail] = useState("demo"),
      [password, setPassword] = useState("demo"),
      [spinnerClass, setSpinnerClass] = useState("displayNone"),
      [expanded, setExpanded] = React.useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState(""),
      [popAnchorEl, setPopAnchorEl] = React.useState(null);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const helpClick = (event) => {
      setPopAnchorEl(event.currentTarget);
      setMsgArr(
         cubeMsgNext(
            "Use the username/password `demo` to login",
            "success",
            msgArr
         )
      );
      // find number of next up slide and then update state of Cube Wrapper to trigger roll
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
   };

   function butClick(e) {
      setMsgArr(cubeMsgNext("Checking credentials ...", "info", msgArr));
      // find number of next up slide and then update state of Cube Wrapper to trigger roll
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );

      const user = {
         email: email,
         password: password,
      };

      if (
         email === null ||
         email === undefined ||
         email === "" ||
         password === null ||
         password === undefined ||
         password === ""
      ) {
         setTimeout(() => {
            setSpinnerClass("displayNone");
            setMsgArr(
               cubeMsgNext(
                  "Login Failed using password: " + password,
                  "error",
                  msgArr
               )
            );
            setCubeWrapperAnim(
               msgArr[msgArr.findIndex((el) => el.current === true)].anim
            );
         }, 500);
         // find number of next up slide and then update state of Cube Wrapper to trigger roll
      } else {
         localForage.setItem("token", false); // clear old token if exists
         login(user)
            .then((res) => {
               if (parseInt(res) !== null) {
                  localForage.setItem("token", res);

                  setTimeout(() => {
                     window.location.href = "/employees";
                  }, 350);
               } else {
                  console.log("+++ unhandled error here: " + __filename);
                  setSpinnerClass("displayNone");
                  setMsgArr(cubeMsgNext("Login Failed ", "error", msgArr));
                  setCubeWrapperAnim(
                     msgArr[msgArr.findIndex((el) => el.current === true)].anim
                  );
                  //setSpinnerClass('displayNone');
                  //       setMsg('Login Failed');
               }
            })
            .catch((err) => {
               setMsgArr(
                  cubeMsgNext(
                     "Login Failed (catch err) please contact the admin",
                     "error",
                     msgArr
                  )
               );
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );
               console.log("+++ error in file: " + __filename + "err=" + err);
            });
      }
   }

   // begin popover
   const popHandleClose = () => {
      setPopAnchorEl(null);
   };

   const popOpen = Boolean(popAnchorEl);
   const popId = popOpen ? "simple-popover" : undefined;
   // end popover

   useEffect(() => {
      console.log("Landing.js use Effect");
      setMsgArr(
         cubeMsgNext("Enter valid credentials to proceed", "Info", msgArr)
      );

      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
   }, [msgArr]);

   const aprops = useSpring({
      config: { duration: 700 },
      from: {
         opacity: 0,
      },
      to: {
         opacity: 1,
      },
      delay: 100,
   });

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            welcome home
            <input
               type='text'
               className='locBox'
               id='location'
               onChange={locChange}
            />
            <FormControl className={classes.margin}>
               <InputLabel htmlFor='input-with-icon-adornment'>
                  With a start adornment
               </InputLabel>
               <Input
                  id='input-with-icon-adornment'
                  startAdornment={
                     <InputAdornment position='start'>
                        <SearchIcon />
                     </InputAdornment>
                  }
               />
            </FormControl>
            <br />
            <a href='/login'>login</a>
            <br />
            https://simplemaps.com/data/us-cities.
         </div>
      </div>
   );
};
