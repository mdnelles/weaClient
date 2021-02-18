import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import uuid from "uuid";

const getPage = (id, ci, ps, co) => {
   let loc = "/forcast/" + ci + "_" + ps + "_" + co + "/" + id;
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
                  src={
                     props.path +
                     "img/flags/" +
                     props.country.toLowerCase() +
                     ".png"
                  }
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
   if (props.suggestedData === []) {
      return <div></div>;
   } else if (props.suggestData !== undefined) {
      return props.suggestData.map((a, i) => (
         <Row
            key={uuid()}
            city={a.ci}
            province={a.ps}
            country={a.co}
            path={props.path}
            id={a.id}
         />
      ));
   } else {
      return <div></div>;
   }
};

export const Home = (props) => {
   const [currentText, setCurrentText] = useState(""),
      [currentTextData, setCurrentTextData] = useState([]),
      [path, setPath] = useState([]),
      [suggestData, setSuggestData] = useState([]);

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
         let p = "",
            loc = window.location.href;
         if (!!loc && !loc.toString().includes("localhost")) {
            setPath("/");
            p = "/";
         } else {
            let temp = loc.toString().split("/");
            for (let i = 3; i <= temp.length; i++) {
               p += "../";
            }
         }
         setPath(p);
         setCurrentText(s);
         fetch(p + "share/" + s + ".json")
            .then((r) => r.text())
            .then((text) => {
               if (!!text && text.length > 3) {
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

   function isAlphaOrParen(str) {
      return /^[a-zA-Z()]+$/.test(str);
   }

   const locChange = (event) => {
      if (event.target.value !== undefined && event.target.value.length > 1) {
         if (isAlphaOrParen(event.target.value)) {
            pullText(event.target.value);
         } else {
            setSuggestData([]);
         }
      } else {
         setSuggestData([]);
      }
   };
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [suggestData]);

   return (
      <div
         style={{
            position: "absolute",
            top: props.top,
            width: props.width,
            zIndex: 80,
         }}
      >
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
            <AllRows key={uuid} suggestData={suggestData} path={path}></AllRows>
         </Paper>
      </div>
   );
};
