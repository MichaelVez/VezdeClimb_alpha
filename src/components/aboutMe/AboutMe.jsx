import React from "react";
import img1 from "../aboutMe/img1.jpg";
import git from "../aboutMe/git.png";
import "../aboutMe/aboutMe.css";
export default function AboutMe() {
  return (
    <div className='aboutMe'>
      <p>Michael,Climber</p>
      <img src={img1} height='60vh' id='myPic' alt='' />
      <a href='https://github.com/MichaelVez' target='_blank' rel='noreferrer'>
        <img src={git} alt='' id='git' />
      </a>
    </div>
  );
}
