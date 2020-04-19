import React, { useState, useEffect } from "react";

import { cl } from "./_sharedFunctions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const Row = (props) => {
   let iso2 = "CA";
   if (props.country !== undefined) iso2 = props.country.toLowerCase();
   return (
      <div key={"i" + props.key}>
         <ListItem button dense={true}>
            <ListItemText dense={true}>
               <img
                  src={"./img/flags/" + iso2 + ".png"}
                  style={{
                     height: 20,
                     width: 38,
                     marginRight: 10,
                     borderRadius: 3,
                  }}
               />
               {props.city}, {props.province}, {props.country}
            </ListItemText>
         </ListItem>
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
      let arrFinal, arr3;
      // first do local country
      //a.c = city, a.o = country, a.n = population
      arrFinal = arr.filter(
         (a) =>
            a.o === country &&
            a.c.toLowerCase().includes(partialText.toLowerCase())
      );
      arr3 = arr.filter(
         (a) =>
            a.o !== country &&
            a.c.toLowerCase().includes(partialText.toLowerCase())
      );
      //sort population 'n' descending
      arr3.sort(function (a, b) {
         return b.n - a.n;
      });

      arr3.slice(0, 5);

      arrFinal = arrFinal.concat(arr3);
      setSuggestData(arrFinal);
   };

   const pullText = (partialText) => {
      let s = partialText.substring(0, 2).toLowerCase();
      if (s !== currentText) {
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
      if (event.target.value !== undefined && event.target.value.length > 1) {
         pullText(event.target.value);
      }
   };
   useEffect(() => {}, [suggestData]);

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
         <Paper
            elevation={3}
            style={{ zIndex: 5, marginLeft: 20, marginRight: 20 }}
         >
            <AllRows suggestData={suggestData}></AllRows>
         </Paper>

         <br />
         <br />
         <br />
         <a href='/login'>login</a>
         <br />
         {/*https://simplemaps.com/suggestData/us-cities.*/}
      </div>
   );
};
