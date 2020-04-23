import React from "react";
import { getCityJSON } from "../ApiDataFunctions";
import ReactJson from "react-json-view";

export const JSONReader = (props) => {
   const [JSONString, setJSONString] = React.useState(""),
      [arr, setArr] = React.useState("loading");
   React.useEffect(() => {
      //fetch specific data
      if (JSONString === "") {
         getCityJSON(props.token, props.dataid).then((data) => {
            setJSONString(data.stringified);
            //console.log(data.stringified);
            setArr(JSON.parse(data.stringified));
            props.setDialogProgress("displayNone");
            console.log(arr);
         });
      }
   }, []);

   return (
      <div>
         JSON reader for id {props.dataid}
         <ReactJson src={arr} />
         <br />
      </div>
   );
};
