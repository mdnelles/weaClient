import React, { useState, useEffect } from "react";

import { cl, countryISO } from "./_sharedFunctions";

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
import uuid from "uuid";

const getPage = (id, ci, ps, co) => {
   let loc = "./forcast/" + ci + "_" + ps + "_" + co + "/" + id;
   setTimeout(() => {
      window.location.href = loc;
   }, 300);
};

const Row = (props) => {
   return (
      <div key={uuid()}>
         <ListItem
            button
            dense={true}
            onClick={() =>
               getPage(props.id, props.city, props.province, props.country)
            }
            style={{ padding: 0 }}
         >
            <ListItemText style={{ padding: 0 }}>
               <img
                  src={"./img/flags/" + props.country + ".png"}
                  style={{
                     height: 17,
                     width: 35,
                     marginRight: 10,
                     paddingLeft: 10,
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
         <Row
            key={uuid()}
            city={a.ci}
            province={a.ps}
            country={a.co}
            id={a.id}
         />
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
      let arrFinal = [];
      // SAMPLE: "id":3429902,"c":"Pontevedra","p":"Buenos Aires","o":"AR"}
      // first do local country
      //a.ci = city, a.ps = prov/state, a.co = country
      arrFinal = arr.filter((a) =>
         a.ci.toLowerCase().includes(partialText.toLowerCase())
      );

      setSuggestData(arrFinal);
   };

   const pullText = (partialText) => {
      let s = partialText.substring(0, 2).toLowerCase();
      if (s !== currentText) {
         setCurrentText(s);
         fetch("./share/" + s + ".json")
            .then((r) => r.text())
            .then((text) => {
               if (text !== undefined && text.length > 3) {
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
         console.log("locChange value=" + event.target.value);
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
            <AllRows key={uuid} suggestData={suggestData}></AllRows>
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
