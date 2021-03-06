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
      const res = await axios.post(serverPath + "/city/get_cities", {
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
      const res = await axios.post(serverPath + "/city/get_citycount", {
         token: theToken,
         code,
         caller: "cityFunctions.getCitysCount",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ cityFunctions.getCitysCount" + err);
      return false;
   }
};

export const getCitysByCountry = async (theToken, country) => {
   try {
      const res = await axios.post(serverPath + "/city/get_cities_by_country", {
         token: theToken,
         country,
         caller: "cityFunctions.getCitysCount",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ cityFunctions.getCitysByCountry" + err);
      return false;
   }
};
export const addCity = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/city/add_city", {
         token: theToken,
         data,
         caller: "cityFunctions.addCity",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ cityFunctions.addCity" + err);
      return false;
   }
};

export const editCity = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/city/edit_city", {
         token: theToken,
         data,
         caller: "cityFunctions.editCity",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ cityFunctions.editCity" + err);
      return false;
   }
};
export const getAPIData = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/city/get_api", {
         token: theToken,
         data,
         caller: "cityFunctions.getAPIData",
      });
      if (res.data.stringified !== undefined) {
         //console.log(JSON.parse(res.data.stringified));
      }
      console.log(res.data);
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ cityFunctions.getAPIData" + err);
      return false;
   }
};
