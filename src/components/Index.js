import React from "react";
import { Home } from "./Home";

const Img = () => {
   return <img src='img/sun3.png' />;
};

export const Index = () => {
   return (
      <div>
         <div className='vertical-center center-outer'>
            <div
               className='center-inner'
               style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 20,
               }}
            >
               <Img />
               <Home />
               <div style={{ textAlign: "center", fontSize: ".8em" }}>
                  OPEN Source Weather App by{" "}
                  <a href='https://github.com/mdnelles' target='_blank'>
                     @mdnelles
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};
