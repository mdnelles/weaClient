import axios from "axios";
import "./config"; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

//export const utilIsLoggedIn = token => {
export const getAPIData = async (token) => {
   try {
      const res = await axios.post(serverPath + "/api/get_from_db", {
         token: token,
         caller: "ApiDataFunctions.getApiData",
      });
      console.log(res.data);
      return res.data;
   } catch (err) {
      console.log("Err (catch) ApiDataFunctions.getApiData: " + err);
      return "ERR:" + err;
   }
};

export const getCityJSON = async (token, id) => {
   console.log("in ApiDataFunctions.getCity");
   try {
      const res = await axios.post(serverPath + "/api/get_city_json", {
         token: token,
         id: id,
         caller: "ApiDataFunctions.getApiData",
      });
      return res.data;
   } catch (err) {
      console.log("Err (catch) ApiDataFunctions.getApiData: " + err);
      return "ERR:" + err;
   }
};
