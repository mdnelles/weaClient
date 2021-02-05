import axios from "axios";
import "./config"; // adding config for folder specific build
import { cl } from "./_sharedFunctions";

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

////// playlists
export const getStates = async (theToken) => {
   cl("getStates");
   try {
      const res = await axios.post(serverPath + "/statewb/get_states", {
         token: theToken,
         caller: "StateFunctions.getStates",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ logFunctions.getStates" + err);
      return false;
   }
};

export const getStatesCount = async (theToken, code) => {
   try {
      const res = await axios.post(serverPath + "/statewb/get_statecount", {
         token: theToken,
         code,
         caller: "stateFunctions.getStatesCount",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.getStatesCount" + err);
      return false;
   }
};

export const getStatesByCountry = async (theToken, country) => {
   try {
      const res = await axios.post(
         serverPath + "/statewb/get_states_by_country",
         {
            token: theToken,
            country,
            caller: "stateFunctions.getStatesCount",
         }
      );
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.getStatesByCountry" + err);
      return false;
   }
};
export const addState = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/statewb/add_state", {
         token: theToken,
         data,
         caller: "stateFunctions.addState",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.addState" + err);
      return false;
   }
};

export const editState = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/statewb/edit_state", {
         token: theToken,
         data,
         caller: "stateFunctions.editState",
      });
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.editState" + err);
      return false;
   }
};
export const getAPIData = async (theToken, data) => {
   try {
      const res = await axios.post(serverPath + "/statewb/get_api", {
         token: theToken,
         data,
         caller: "stateFunctions.getAPIData",
      });
      if (res.data.stringified) {
         //console.log(JSON.parse(res.data.stringified));
      }
      console.log(res.data);
      return res.data;
   } catch (err) {
      cl("ClientSide Error @ stateFunctions.getAPIData" + err);
      return false;
   }
};
