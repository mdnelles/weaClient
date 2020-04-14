import axios from 'axios';
import './config'; // adding config for folder specific build
import { cl } from './_sharedFunctions';

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

////// playlists
export const getCountries = async (theToken) => {
   cl('getCountrys');
   try {
      const res = await axios.post(serverPath + '/country/get_countries', {
         token: theToken,
         caller: 'CountryFunctions.getCountrys',
      });
      return res.data;
   } catch (err) {
      cl('ClientSide Error @ logFunctions.getCountrys' + err);
      return false;
   }
};

export const getCountrysCount = async (theToken, code) => {
   try {
      const res = await axios.post(serverPath + '/country/get_countrycount', {
         token: theToken,
         code,
         caller: 'countryFunctions.getCountrysCount',
      });
      return res.data;
   } catch (err) {
      cl('ClientSide Error @ countryFunctions.getCountrysCount' + err);
      return false;
   }
};
