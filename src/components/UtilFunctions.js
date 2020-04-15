import axios from 'axios';
import localForage from 'localforage';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

//export const utilIsLoggedIn = token => {
export const genJSON = async (token) => {
   try {
      console.log('genJSON');
      const res = await axios.post(serverPath + '/utils/gen_json', {
         token: token,
         caller: 'UtilFunctions.genJSON',
      });
      console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('Err (catch) UtilFunctions > genJSON ... ' + err);
      document.location.href = '/';
      return false;
   }
};
