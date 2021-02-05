import React, { useState, useEffect } from "react";
import { login, getCaptchaKey } from "./UserFunctions";
import localForage from "localforage";
import { CubeMsg } from "./3d/CubeMsg";
import { cubeMsgNext, obj } from "./_sharedFunctions";

import { useSpring, animated as a } from "react-spring";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Recaptcha from "react-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Popover from "@material-ui/core/Popover";

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

function ListItemLink(props) {
   return <ListItem button component='a' {...props} />;
}

export const Login = () => {
   const classes = useStyles();

   const [email, setEmail] = useState("demo"),
      [password, setPassword] = useState("demo"),
      [spinnerClass, setSpinnerClass] = useState("displayNone"),
      [expanded, setExpanded] = React.useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [captchaKey, setCaptchaKey] = useState(""),
      [submitClass, setSubmitClass] = useState("displayNone"),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState(""),
      [popAnchorEl, setPopAnchorEl] = React.useState(null);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const captcha = (event) => {
      console.log(event);
      setSubmitClass("displayBlock");
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
         //localForage.removeItem("token").then(() => {
         login(user)
            .then((res) => {
               if (parseInt(res) !== null) {
                  localForage.setItem("token", res);
                  console.log("setting token: " + res);
                  setTimeout(() => {
                     window.location.href = "/countries";
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
         //});
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
      console.log("Login - useEffect");
      setMsgArr(
         cubeMsgNext("Enter valid credentials to proceed", "Info", msgArr)
      );

      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      getCaptchaKey().then((data) => {
         console.log(data);
         if (!!data && data.length > 10) {
            setCaptchaKey(data);
         } else {
            console.log("Err: not authorized for captch key");
         }
      });
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
   let captchaPlace = "";
   if (!!captchaKey && captchaKey !== "") {
      captchaPlace = (
         <Recaptcha
            sitekey={captchaKey}
            render='explicit'
            verifyCallback={(event) => captcha(event)}
         />
      );
   } else {
      captchaPlace = "";
   }

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <div className={spinnerClass}>
               <CircularProgress />
            </div>
            <div className='contain '>
               <div className={"cubeWrapper " + cubeWrapperAnim} id='stage'>
                  <CubeMsg
                     msgArr={msgArr}
                     width={"100%"}
                     height={78}
                     marginT={-60}
                  />
               </div>
            </div>
            <div style={{ padding: 10, display: "block" }}></div>
            <a.div style={aprops}>
               <Card className={classes.root}>
                  <CardContent>
                     <form>
                        <div
                           className={"center-inner" + submitClass}
                           style={{ padding: 10 }}
                        >
                           <br />
                           {captchaPlace}
                           <br /> <br />
                           <div className={submitClass}>
                              <TextField
                                 label='email / username'
                                 ariant='outlined'
                                 defaultValue={email}
                                 onChange={(event) =>
                                    setEmail(event.target.value)
                                 }
                              />
                              <TextField
                                 label='Password'
                                 ariant='outlined'
                                 defaultValue={password}
                                 onChange={(event) =>
                                    setPassword(event.target.value)
                                 }
                              />
                              <br />
                              <br />
                              <Button
                                 variant='contained'
                                 color='secondary'
                                 onClick={butClick}
                              >
                                 Login
                              </Button>
                           </div>
                        </div>
                     </form>
                     <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                     ></Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                     <IconButton aria-label='Help' onClick={helpClick}>
                        <HelpOutlineIcon />
                     </IconButton>
                     <Popover
                        id={popId}
                        open={popOpen}
                        anchorEl={popAnchorEl}
                        onClose={popHandleClose}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "center",
                        }}
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "center",
                        }}
                     >
                        <Typography className={classes.typography}>
                           This is a live weather app - with demo credentials it
                           will limit your ability to make permanent change in
                           the database.
                        </Typography>
                     </Popover>

                     <IconButton
                        className={clsx(classes.expand, {
                           [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='show more'
                     ></IconButton>
                  </CardActions>
               </Card>
            </a.div>
         </div>
      </div>
   );
};
