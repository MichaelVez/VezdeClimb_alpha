import React from "react";
import { Link } from "react-router-dom";
import "./routeInfo.css";
import { useMyState } from "../Context";
import axios from "axios";

export default function RouteInfo({
  creator,
  data,
  date,
  grade,
  routeName,
  id,
}) {
  const context = useMyState();
  const handleDelete = () => {
    axios.delete(
      `https://628e3595368687f3e71287e0.mockapi.io/Climbing-wall/${id}`
    );
  };

  return (
    <div className='routeInfo'>
      <div className='info'>
        <div>Name: {routeName} </div>
        <div>Grade: {grade} </div>
        <div>Created By : {creator}</div>
        <div>Date:{date}</div>
      </div>
      <div className='routeButtons'>
        <Link
          to={{ pathname: "/the-wall" }}
          onClick={() => {
            context.setMyState({ data, click: true });
          }}
        >
          <span className='material-icons'>open_in_new</span>
        </Link>
        <span className='material-icons' onClick={handleDelete}>
          {" "}
          delete
        </span>
      </div>
    </div>
  );
}
