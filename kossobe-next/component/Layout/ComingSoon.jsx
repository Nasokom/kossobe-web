import React from 'react'

import Lottie from "lottie-react";
import groovyWalkAnimation from "./lottie.json";

const Example = () => {

  return(
    <div id='lottie'>
      <Lottie animationData={groovyWalkAnimation} />;
    </div>
      )
};


const ComingSoon = () => {
  return (
    <div id="comingSoon">
       
<<<<<<< HEAD
            <h1 id="soonText1">Website under <span>🏗️</span></h1>
=======
            <h1 id="soonText1">Website under <span style={{fontSize:'15vw', backgroundColor:'#FFFFF2', padding:'10px', borderRadius:'20px'}}>🏗️</span></h1>
>>>>>>> design2
            <Example />
            <h1 id="soonText2">Coming Soon </h1> 
    </div>
  )
}

export default ComingSoon
