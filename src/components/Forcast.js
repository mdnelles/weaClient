import React from "react";
import axios from "axios";
export const Forcast = () => {
   const [city, setCity] = React.useState("");
   const [geo2, setGeo2] = React.useState("");
   React.useEffect(() => {
      let temp = window.location.href.toString().split("/");
      let rest1 = temp[temp.length - 1].toString();
      let rest2 = temp[temp.length - 2].toString();
      setCity(rest2.replace("_", " "));
      setGeo2(rest1.replace("_", " "));
   });

   return (
      <div>
         Weather for {city},{geo2}
      </div>
   );
};
