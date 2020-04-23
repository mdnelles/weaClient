import React from "react";
import axios from "axios";
export const Forcast = () => {
   const [rest1, setRest1] = React.useState(""),
      [rest2, setRest2] = React.useState("");
   React.useEffect(() => {
      let temp = window.location.href.toString().split("/");
      setRest1(temp[temp.length - 1].toString());
      setRest2(temp[temp.length - 2].toString().replace(/_/g, ", "));
   });

   return (
      <div>
         Weather for {rest2},{rest1}
      </div>
   );
};
