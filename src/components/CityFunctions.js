import axios from "axios";
import "./config"; // adding config for folder specific build
import { cl } from "./_sharedFunctions";

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

////// playlists
export const getCities = async (theToken) => {
   cl("getCitys");
   try {
      const res = await axios.post(serverPath + "/citywb/get_cities", {
         token: theToken,
         caller: "CityFunctions.getCitys",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ logFunctions.getCitys" + err);
      return false;
   }
};

export const getCitysCount = async (theToken, code) => {
   try {
      const res = await axios.post(serverPath + "/citywb/get_statecount", {
         token: theToken,
         code,
         caller: "stateFunctions.getCitysCount",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.getCitysCount" + err);
      return false;
   }
};

export const getCitysByCountry = async (theToken, country) => {
   try {
      const res = await axios.post(
         serverPath + "/citywb/get_cities_by_country",
         {
            token: theToken,
            country,
            caller: "stateFunctions.getCitysCount",
         }
      );
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.getCitysByCountry" + err);
      return false;
   }
};
export const addCity = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/citywb/add_state", {
         token: theToken,
         data,
         caller: "stateFunctions.addCity",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.addCity" + err);
      return false;
   }
};

export const editCity = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/citywb/edit_state", {
         token: theToken,
         data,
         caller: "stateFunctions.editCity",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.editCity" + err);
      return false;
   }
};
export const getAPIData = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/citywb/get_api", {
         token: theToken,
         data,
         caller: "stateFunctions.getAPIData",
      });
      if (res.data.stringified !== undefined) {
         //console.log(JSON.parse(res.data.stringified));
      }
      console.log(res.data);
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.getAPIData" + err);
      return false;
   }
};
