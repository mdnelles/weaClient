import axios from "axios";
import "./config"; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

////// playlists
export const getLogs = async (token) => {
   console.log("getLogs");
   try {
      const res = await axios.post(serverPath + "/logs/get_logs", {
         token,
         caller: "logFunctions.getLogs",
      });
      return res.data;
   } catch (err) {
      console.log("ClientSide Error @ logFunctions.getLogs" + err);
      return false;
   }
};

export const getLogsCount = async (token, code) => {
   try {
      const res = await axios.post(serverPath + "/logs/get_logcount", {
         token,
         code,
         caller: "logFunctions.getLogsCount",
      });
      return res.data;
   } catch (err) {
      console.log("ClientSide Error @ logFunctions.getLogsCount" + err);
      return false;
   }
};
