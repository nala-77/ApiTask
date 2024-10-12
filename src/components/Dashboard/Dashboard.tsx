import "./Dashboard.css";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
// import Card from "../Card/Card";

import focalX from "./../../../public/Logo.svg";
import profilePic from "./../../../public/pexels-photo-2379004 1.png";
import favorite from "./../../../public/bookmark 1.svg";
import productsPic from "./../../../public/Vector.svg";
// import itemPic from "./../../../public/image 1.png";
// import Pagination from "../Pagenation/Pagenation";
// import { useEffect, useState } from "react";
// import axios from "axios"; // or fetch

const linksArray = [
  {
    link: "Products",
    to: "/dashboard/products",
    img: productsPic,
  },
  {
    link: "Favorites",
    to: "/error",
    img: favorite,
  },
  {
    link: "Order list",
    to: "/error",
    img: favorite,
  },
];

function Dashboard() {

  return (
    <main className="dashbord-layout">
      <Sidebar
        head_image={focalX}
        profile_img={profilePic}
        name="Mohammed Alkordy"
        linksArray={linksArray}
      />
     
      <Outlet />
    </main>
  );
}

export default Dashboard;
