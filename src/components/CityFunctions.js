import axios from 'axios';
import './config'; // adding config for folder specific build
import { cl } from './_sharedFunctions';

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

////// playlists
export const getCities = async (theToken) => {
   cl('getCitys');
   try {
      const res = await axios.post(serverPath + '/city/get_cities', {
         token: theToken,
         caller: 'CityFunctions.getCitys',
      });
      return res.data;
   } catch (err) {
      cl('ClientSide Error @ logFunctions.getCitys' + err);
      return false;
   }
};

export const getCitysCount = async (theToken, code) => {
   try {
      const res = await axios.post(serverPath + '/city/get_citycount', {
         token: theToken,
         code,
         caller: 'cityFunctions.getCitysCount',
      });
      return res.data;
   } catch (err) {
      cl('ClientSide Error @ cityFunctions.getCitysCount' + err);
      return false;
   }
};
