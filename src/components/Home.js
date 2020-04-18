import React, { useState, useEffect } from "react";
import { login } from "./UserFunctions";
import localForage from "localforage";
import { CubeMsg } from "./3d/CubeMsg";
import { cl, cubeMsgNext, obj } from "./_sharedFunctions";

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

const Row = (props) => {
   return (
      <div key={"i" + props.key}>
         {props.city}, {props.province}, {props.country}
      </div>
   );
};

const AllRows = (props) => {
   if (props.suggestData !== undefined) {
      return props.suggestData.map((a, i) => (
         <Row key={i} city={a.c} province={a.p} country={a.o} />
      ));
   } else {
      return <div></div>;
   }
};

export const Home = () => {
   const [currentText, setCurrentText] = useState(""),
      [currentTextData, setCurrentTextData] = useState([]),
      [suggestData, setSuggestData] = useState([]),
      [country, setCountry] = useState("CA");

   const prune = (partialText, arr) => {
      cl("in prune partial = " + partialText);
      console.log(arr);
      if (arr.length > 10) {
         setSuggestData(
            arr.filter(
               (a) =>
                  a.o === country &&
                  a.c.toLowerCase().includes(partialText.toLowerCase())
            )
         );
      } else {
         cl("less than 10");
         setSuggestData(
            arr.filter((a) =>
               a.c.toLowerCase().includes(partialText.toLowerCase())
            )
         );
      }
   };

   const pullText = (partialText) => {
      let s = partialText.substring(0, 2).toLowerCase();
      cl("partialText=" + partialText);
      if (s !== currentText) {
         console.log("new pull");
         setCurrentText(s);
         fetch("./share/" + s + ".txt")
            .then((r) => r.text())
            .then((text) => {
               if (text !== undefined && text.length > 2) {
                  var arr = JSON.parse(text);
                  setCurrentTextData(arr);
                  console.log(arr.length + " - " + s);
                  prune(partialText, arr);
               }
            });
      } else {
         var arr = currentTextData;
         prune(partialText, arr);
      }
   };

   const locChange = (event) => {
      let s = event.target.value;
      if (s !== undefined && s.length > 1) {
         pullText(s);
      }
   };
   useEffect(() => {
      cl("in useEffect");
   }, [suggestData]);

   return (
      <div>
         <div className='header'>
            <FormControl fullWidth={true}>
               <InputLabel htmlFor='input-with-icon-adornment'>
                  Search City
               </InputLabel>
               <Input
                  onChange={locChange}
                  id='input-with-icon-adornment'
                  fullWidth={true}
                  startAdornment={
                     <InputAdornment position='start'>
                        <SearchIcon />
                     </InputAdornment>
                  }
               />
            </FormControl>
         </div>
         <AllRows suggestData={suggestData}></AllRows>
         <br />
         <br />
         <br />
         <a href='/login'>login</a>
         <br />
         {/*https://simplemaps.com/suggestData/us-cities.*/}
      </div>
   );
};
