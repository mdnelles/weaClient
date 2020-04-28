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

const getData16days = async (city_id, rendered) => {
   console.log("rendered =  " + rendered);
   if (rendered === false) {
      try {
         const res = await axios.post(serverPath + "/citywb/get_data_16", {
            city_id,
            caller: "Forcast.getData16days",
         });
         console.log(res.data);
         return res.data;
      } catch (err) {
         console.log("Err (catch) ApiDataFunctions.getApiData16days: " + err);
         return "ERR:" + err;
      }
   }
};

export const Forcast = () => {
   const classes = useStyles();
   const [location, setLocation] = React.useState(""),
      [rendered, setRendered] = React.useState(false),
      [obj, setObj] = React.useState([]);

   React.useEffect(() => {
      if (rendered === false) {
         let temp = window.location.href.toString().split("/");
         setLocation(
            temp[temp.length - 2]
               .toString()
               .replace(/_/g, ", ")
               .replace(/%20/g, " ")
         );
         getData16days(temp[temp.length - 1].toString(), rendered).then(
            (data) => {
               if (data[0].stringified !== undefined) {
                  let d = JSON.parse(data[0].stringified);
                  setObj(d);
               } else {
                  setObj(data);
                  console.log(data);
               }
               setRendered(true);
            }
         );
      }
   }, []);

   return (
      <Card className={classes.root} variant='outlined' style={{ margin: 10 }}>
         <CardContent>
            {rendered === false ? (
               <div>
                  <CircularProgress />
                  <br />
                  loading
               </div>
            ) : (
               <div>
                  <Home />

                  <span
                     style={{
                        fontSize: "3vw",
                        textAlign: "center",
                        paddingLeft: 20,
                     }}
                  >
                     Weather forcast for {location}
                  </span>

                  <div className='grid-container-3col'>
                     <div className='grid-item txtr'>
                        <div className='center-inner'>
                           <img
                              src={
                                 rendered === true
                                    ? "../../img/icons/" +
                                      obj[obj[obj[1].weather].icon] +
                                      ".png"
                                    : null
                              }
                              style={{
                                 maxWidth: "100%",
                                 height: "auto",
                              }}
                           />
                        </div>
                     </div>

                     <div className='grid-item' style={{ fontSize: "2.5vw" }}>
                        <div className='center-inner'>
                           <p align='center'>
                              High {obj[1].high_temp}&#176; C
                              <br />
                              Low {obj[1].low_temp}&#176; C<br />
                              Precipitation
                              {parseInt(obj[1].precip * 100) / 100} mm
                           </p>
                        </div>
                     </div>
                     <div className='grid-item'>
                        <div className='center-inner'>
                           <span style={{ fontSize: "5vw" }}>
                              {obj[1].high_temp} &#176; C
                           </span>
                           <br />
                           <span style={{ color: "#037bfc" }}>
                              {obj[obj[obj[1].weather].description]}
                           </span>
                           <br />
                           Feels like: {obj[1].app_max_temp} &#176; C
                        </div>
                     </div>
                  </div>
                  <div className='grid-container-2col'>
                     <div className='grid-item txtr'>Cloud Cover</div>
                     <div className='grid-item grayish'>~{obj[1].clouds} %</div>
                     <div className='grid-item txtr'>Wind</div>
                     <div className='grid-item grayish'>
                        {obj[obj[1].wind_cdir_full] +
                           " " +
                           parseInt(obj[1].wind_spd * 10) / 10 +
                           "km/h"}
                     </div>
                     <div className='grid-item txtr'>UV</div>
                     <div className='grid-item grayish'>
                        {parseInt(obj[1].uv * 10) / 10}
                     </div>
                     <div className='grid-item txtr'>Dewpoint</div>
                     <div className='grid-item grayish'>{obj[1].dewpt}</div>
                     <div className='grid-item txtr'>Pressure</div>
                     <div className='grid-item grayish'>{obj[1].dhi} mb</div>
                     <div className='grid-item txtr'>Relative humidity</div>
                     <div className='grid-item grayish'>{obj[1].rh} %</div>
                     <div className='grid-item txtr'>BP</div>
                     <div className='grid-item grayish'>{obj[1].dhi} KPa</div>
                  </div>
               </div>
            )}
         </CardContent>
      </Card>
   );
};
