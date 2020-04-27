import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { Home } from "./Home";

const useStyles = makeStyles({
   root: {
      minWidth: 275,
   },
   bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
   },
   title: {
      fontSize: 14,
   },
   pos: {
      marginBottom: 12,
   },
});

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

const getDataLive = async (city_id, rendered) => {
   console.log("rendered =  " + rendered);
   if (rendered === false) {
      try {
         const res = await axios.post(serverPath + "/citywb/get_data_live", {
            city_id,
            caller: "Forcast.getDataLive",
         });
         console.log(res.data);
         return res.data;
      } catch (err) {
         console.log("Err (catch) ApiDataFunctions.getApiData: " + err);
         return "ERR:" + err;
      }
   }
};

export const Forcast = () => {
   const classes = useStyles();
   const [location, setLocation] = React.useState(""),
      [rendered, setRendered] = React.useState(false),
      [obj, setObj] = React.useState([]),
      [objBase, setObjBase] = React.useState([]);

   React.useEffect(() => {
      if (rendered === false) {
         let temp = window.location.href.toString().split("/");
         setLocation(
            temp[temp.length - 2]
               .toString()
               .replace(/_/g, ", ")
               .replace(/%20/g, " ")
         );
         getDataLive(temp[temp.length - 1].toString(), rendered).then(
            (data) => {
               setObj(data);
               console.log(data);
               setObjBase(data[0]);
               setRendered(true);
            }
         );
      }
   }, []);

   return (
      <Card className={classes.root} variant='outlined' style={{ margin: 10 }}>
         <CardContent>
            {obj === [] ? (
               <div>
                  <CircularProgress />
                  <br />
                  loading
               </div>
            ) : (
               <div>
                  <Home />
                  <Typography variant='h5' component='h2'>
                     <span style={{ fontSize: "3vw" }}>
                        Weather forcast for {location}
                     </span>
                  </Typography>

                  <TableContainer>
                     <Table aria-label='simple table'>
                        <TableHead>
                           <TableRow>
                              <TableCell>
                                 <div className='center-inner'>
                                    <img
                                       src={
                                          rendered === true
                                             ? "../../img/icons/" +
                                               obj[15] +
                                               ".png"
                                             : null
                                       }
                                       style={{
                                          maxWidth: "100%",
                                          height: "auto",
                                       }}
                                    />
                                 </div>
                              </TableCell>
                              <TableCell align='center'>
                                 {" "}
                                 <div className='center-inner'>
                                    <span style={{ fontSize: "5vw" }}>
                                       {objBase.temp} &#176; C
                                    </span>
                                    <br />
                                    <span style={{ color: "#037bfc" }}>
                                       {obj[17]}
                                    </span>
                                    <br />
                                    Feels like: {objBase.app_temp}
                                 </div>
                              </TableCell>
                           </TableRow>
                        </TableHead>
                     </Table>
                  </TableContainer>

                  <TableContainer>
                     <Table style={{ fontSize: "5vw" }}>
                        <TableRow>
                           <TableCell align='right'>Cloud Cover</TableCell>
                           <TableCell align='left'>
                              ~{objBase.clouds} %
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>Wind</TableCell>
                           <TableCell align='left'>
                              {obj[8] +
                                 " " +
                                 parseInt(objBase.wind_spd) +
                                 "km/h"}
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>UV</TableCell>
                           <TableCell align='left'>{objBase.uv}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>Dewpoint</TableCell>
                           <TableCell align='left'>{objBase.dewpt}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>Radiation</TableCell>
                           <TableCell align='left'>
                              {objBase.solar_rad} (W/m<sup>2</sup>).
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>Pressure</TableCell>
                           <TableCell align='left'>{objBase.dhi} mb</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>
                              Relative humidity
                           </TableCell>
                           <TableCell align='left'>{objBase.rh} %</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align='right'>BP</TableCell>
                           <TableCell align='left'>{objBase.dhi} KPa</TableCell>
                        </TableRow>
                     </Table>
                  </TableContainer>
               </div>
            )}
         </CardContent>
      </Card>
   );
};
