import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
// import { prependOnceListener } from "cluster";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=>{
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {
        console.log(res.data)
        let results = res.data;
        let newArray = results.filter( color => !(Object.entries(color).length === 0 && color.constructor === Object))
        setColorList(newArray) 
    })
    .catch(err => console.log(err.response));
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
