import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/the-wall' className='link'>
          The Wall
        </Link>
        <Link to='/routes' className='link'>
          Community routes
        </Link>

        <Link to='/about-me' className='link'>
          About me
        </Link>
      </div>
    );
  }
}
