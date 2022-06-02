import React from "react";
import img1 from "../aboutMe/img1.jpg";
import git from "../aboutMe/git.png";
import "../aboutMe/aboutMe.css";
export default function AboutMe() {
  return (
    <div className='aboutMe'>
      <p>Hey im michael and i need to add stuff here</p>
      <img src={img1} height='60vh' id='myPic' alt='' />
      <img src={git} alt='' id='git' />
    </div>
  );
}
