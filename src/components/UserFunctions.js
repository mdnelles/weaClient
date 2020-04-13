import axios from 'axios';
import localForage from 'localforage';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

//export const userIsLoggedIn = token => {
export const userIsLoggedIn = async (token) => {
   try {
      const res = await axios.post(serverPath + '/user/islogged', {
         token: token,
         caller: 'UserFunctions.userIsLoggedIn',
      });
      return res.data;
   } catch (err) {
      console.log('Err (catch) UserFunctions > userIsLoggedIn ... ' + err);
      document.location.href = '/';
      return false;
   }
};

export const login = async (user) => {
   try {
      const res = await axios.post(serverPath + '/user/login', {
         email: user.email,
         password: user.password,
         caller: 'UserFunctions.register',
      });
      return res.data.token;
   } catch (err) {
      console.log('Error (catch) UserFunctions > login' + err);
      return 0;
   }
};

export const logout = () => {
   localForage.removeItem('token').then(() => {
      console.log('token cleared');
      window.location.href = '/login';
   });
};
