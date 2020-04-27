import React from "react";
import axios from "axios";

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

const getDataLive = async (city_id) => {
   try {
      const res = await axios.post(serverPath + "/api/get_data_live", {
         city_id,
         caller: "Forcast.getDataLive",
      });
      console.log(res.data);
      return res.data;
   } catch (err) {
      console.log("Err (catch) ApiDataFunctions.getApiData: " + err);
      return "ERR:" + err;
   }
};

export const Forcast = () => {
   const [rest1, setRest1] = React.useState(""),
      [rest2, setRest2] = React.useState(""),
      [display, setDisplay] = React.useState("");
   React.useEffect(() => {
      let temp = window.location.href.toString().split("/");
      setRest1(temp[temp.length - 1].toString());
      setRest2(temp[temp.length - 2].toString().replace(/_/g, ", "));
      getDataLive(temp[temp.length - 1].toString()).then((data) => {
         setDisplay(JSON.stringify(data));
      });
   });

   return (
      <div>
         Weather for {rest2},{rest1}
         {display}
      </div>
   );
};
