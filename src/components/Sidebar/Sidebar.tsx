import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import logout from "./../../../public/sign-out-alt 1(1).svg";
import { useState } from "react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
interface sidebarLinks {
  link: string;
  to: string;
  img: string;
}
interface sidebarData {
  head_image: string;
  profile_img: string;
  name: string;
  linksArray: sidebarLinks[];
}
function Sidebar({ head_image, profile_img, name, linksArray }: sidebarData) {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setState(!state);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div
        className={
          state ? "dashboard-sidebar sidebar-active" : "dashboard-sidebar"
        }
      >
        <div className="sidebar-head-parent">
          <div className="sidebar-head">
            <img src={head_image} alt="sidebar-head" />
          </div>

          <div className="profile-img">
            <img src={profile_img} alt="profile img" />
          </div>

          <h2>{name}</h2>
        </div>

        <ul>
          {linksArray.map((element, i) => {
            return (
              <li key={i} className="links-item">
                <img src={element.img} alt="image" />
                <Link to={element.to}>{element.link}</Link>
              </li>
            );
          })}
        </ul>

        <div>
          <button className="sidebar-logOut" onClick={handleLogout}>
            Logout
            <img src={logout} alt="logout" />
          </button>
        </div>
      </div>
      <div className="responsive-icon">
        <div className={state ? "overlay" : ""} onClick={handleClick}>
          <FontAwesomeIcon className="user-icon" icon={faCircleUser} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
