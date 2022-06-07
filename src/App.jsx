import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Wall from "./components/Wall/Wall";
import AboutMe from "./components/aboutMe/AboutMe";
import CommunityRoutes from "./components/communityRoutes/CommunityRoutes";
import "./App.css";
import "./assets/googleIcons.css";
export default function App() {
  return (
    <>
      <Navbar />
      <Route path='/' exact component={Homepage} />
      <Route path='/the-wall' exact component={Wall} />
      <Route path='/about-me' exact component={AboutMe} />
      <Route path='/routes' exact component={CommunityRoutes} />
    </>
  );
}
