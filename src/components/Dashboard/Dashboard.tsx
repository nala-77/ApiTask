import "./Dashboard.css";


import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

// for images
import focalX from "./../../../public/Logo.svg";
import profilePic from "./../../../public/pexels-photo-2379004 1.png";
import favorite from "./../../../public/bookmark 1.svg";
import productsPic from "./../../../public/Vector.svg";
import { useEffect, useState } from "react"
import defaultProfilePic from "./../../../public/pexels-photo-2379004 1.png"


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
  const [name, setName] = useState<string>("")
  const [profileImg, setProfileImg] = useState<string>("")

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedProfileImg = localStorage.getItem("img");
    if (storedName) {
      setName(storedName);
    } else {
      setName("User");
    }

    if (storedProfileImg) {
      setProfileImg(storedProfileImg);
    } else {
      setProfileImg(defaultProfilePic);
    }
  }, []);

  return (
    <main className="dashboard-layout">
      <Sidebar
        head_image={focalX}
        profile_img={profileImg}
        name={name}
        linksArray={linksArray}
      />

      <Outlet />
    </main>
  );
}

export default Dashboard;