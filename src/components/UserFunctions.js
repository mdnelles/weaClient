import axios from "axios";
import localForage from "localforage";
import "./config"; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

export const addUser = (newUser, theToken) => {
   return axios
      .post(serverPath + "/user/register", {
         uuid: newUser.uuid,
         first_name: newUser.first_name,
         last_name: newUser.last_name,
         email: newUser.email,
         password: newUser.password,
         admin: newUser.admin,
         token: theToken,
         caller: "UserFunctions.register",
      })
      .then((res) => {
         console.log("Registered");
         return res;
      })
      .catch((err) => {
         console.log("ClientSide Error @ UserFunctions > getUsers " + err);
         return "++Error Loc 10";
      });
};
export const editUser = (editUser, theToken) => {
   return axios
      .post(serverPath + "/user/edit", {
         id: editUser.id,
         first_name: editUser.first_name,
         last_name: editUser.last_name,
         email: editUser.email,
         password: editUser.password,
         token: theToken,
         caller: "UserFunctions.editUser",
      })
      .then((res) => {
         console.log("UserFunctions.editUser");
         return res;
      })
      .catch((err) => {
         console.log("ClientSide Error @ UserFunctions.editUser " + err);
         return "++Error Loc 10";
      });
};

export const removeUser = (id, token) => {
   return axios
      .post(serverPath + "/user/remove_user", {
         id,
         token,
         caller: "UserFunctions.register",
      })
      .then((res) => {
         console.log("User Removed");
         return 1;
      })
      .catch((err) => {
         console.log("ClientSide Error @ UserFunctions > removeUser " + err);
         return "++Error Loc 02";
      });
};

export const getUsers = async (theToken) => {
   try {
      const res = await axios.post(serverPath + "/user/getusers", {
         token: theToken,
         caller: "UserFunctions.register",
      });
      //console.log(res.data)
      return res.data;
   } catch (err) {
      console.log("ClientSide Error @ UserFunctions > getUsers " + err);
      return "++Error Loc 07";
   }
};
//export const userIsLoggedIn = token => {
export const userIsLoggedIn = async (token) => {
   try {
      const res = await axios.post(serverPath + "/user/islogged", {
         token: token,
         caller: "UserFunctions.userIsLoggedIn",
      });
      return res.data;
   } catch (err) {
      console.log("Err (catch) UserFunctions > userIsLoggedIn ... " + err);
      document.location.href = "/";
      return false;
   }
};

export const login = async (user) => {
   try {
      const res = await axios.post(serverPath + "/user/login", {
         email: user.email,
         password: user.password,
         caller: "UserFunctions.register",
      });
      return res.data.token;
   } catch (err) {
      console.log("Error (catch) UserFunctions > login" + err);
      return 0;
   }
};

export const logout = () => {
   localForage.removeItem("token").then(() => {
      console.log("token cleared");
      window.location.href = "/";
   });
};
