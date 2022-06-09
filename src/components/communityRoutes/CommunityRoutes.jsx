import axios from "axios";
import React, { useEffect, useState } from "react";
import "./communityRoutes.css";
import RouteInfo from "./RouteInfo";
export default function CommunityRoutes() {
  const [isSpinning, setIsSpinning] = useState(true);
  const [fetchData, setFetchData] = useState([]);
  const mySpinner = () => {
    return <div className='spinner2'></div>;
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://628e3595368687f3e71287e0.mockapi.io/Climbing-wall"
        );
        setFetchData(data);
        setIsSpinning(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const RenderRoutes = () => {
    return fetchData.map((route) => {
      return (
        <RouteInfo
          key={route.id}
          id={route.id}
          creator={route.creator}
          data={route.data}
          grade={route.grade}
          date={route.date}
          routeName={route.routeName}
        />
      );
    });
  };
  return (
    <div>
      {isSpinning && mySpinner()}
      {RenderRoutes()}
    </div>
  );
}
