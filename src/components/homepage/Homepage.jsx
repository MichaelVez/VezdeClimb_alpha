import React from "react";
import "./homepage.css";
export default function Homepage() {
  return (
    <div className='homepage'>
      <div className='cont'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4yWI4hGu2m2-AaKf-fAy2oKUvyOKtRw_tHTa-iBrxz6yCD30YJd-hTHBOpDuMPm4MZE&usqp=CAU'
          alt=''
        />
        <div>
          Hello and Welcome!, This site allows you to edit your own climbing
          route and share it with friends.
        </div>
        <div>This was build using ThreeJS and react</div>
        <h3>How to use</h3>
        <div>While in the wall you can click and hold to view around</div>
        <div>Hold SHIFT to move the camera </div>
        <div>Use mouse wheel to zoom in and out</div>
        <div>Select a hold and edit it from the menu</div>
        <div>Click anywhere on the wall to add the hold</div>
      </div>
    </div>
  );
}
