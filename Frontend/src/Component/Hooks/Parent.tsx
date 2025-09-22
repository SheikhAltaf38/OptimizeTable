import React, { useEffect, useRef, useState } from "react";
import FirstChild from "./FirstChild";

function Parent() {
  const [counter, setCounter] = useState(0);
  const inputref = useRef(0);
  console.log("parent");
  function inc() {
   
    console.log(counter);
    setCounter(counter + 1);
    inputref.current++;
    console.log(inputref.current);
  }
  function decr() {
    setCounter(counter - 1)
    console.log(counter);
  }
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, [counter]);
  return (
    <div>
      Parent
      <div className="flex justify-center space-x-5 mt-8">
        <FirstChild />
        <button
          onClick={inc}
          className="px-3 py-1 rounded-md bg-white text-black text-xl"
        >
          Inc
        </button>
        <h1 className="text-2xl font-bold text-white">{counter}</h1>

        <button
          onClick={decr}
          className="px-3 py-1 rounded-md bg-white text-black text-xl"
        >
          Decr
        </button>
      </div>
    </div>
  );
}

export default Parent;
