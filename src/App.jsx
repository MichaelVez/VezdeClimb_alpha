import React from "react";
import { Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Wall from "./components/Wall/Wall";

export default function App() {
  return (
    <>
      <Navbar />
      <Route path='/' exact component={Homepage} />
      <Route path='/the-wall' exact component={Wall} />
    </>
  );
}
