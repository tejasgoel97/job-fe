import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import NewHeaderNavContent from "./NewHeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import useAuthStore from "@/utils/authStoreZusland";

import { useLocation } from "react-router-dom";
import { contractorMenuData } from "./DashboardContractorSidebar";
import { candidateMenuData } from "./DashboardCandidatesSidebar";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const { logout, user } = useAuthStore();
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);
  const currentRole = localStorage.getItem("jp-current-role");
  let menuData = employerMenuData;
  if (currentRole === "contractor") {
    menuData = contractorMenuData;
  } else if (currentRole === "candidate") {
    menuData = candidateMenuData;
  }
  console.log(currentRole)
  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img alt="brand" src="/images/logo.svg" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <NewHeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <button className="menu-btn">
              <span className="count">1</span>
              <span className="icon la la-heart-o"></span>
            </button>
            {/* wishlisted menu */}

            <button className="menu-btn">
              <span className="icon la la-bell"></span>
            </button>
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  alt="avatar"
                  className="thumb"
                  src="/images/resource/company-6.png"
                />
                <span className="name">My Account</span>
              </a>

              <ul className="dropdown-menu">
                {menuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, pathname) ? "active" : ""
                    } mb-1`}
                    key={item.id}
                  >
                    <Link to={item.routePath}>
                      <i className={`la ${item.icon}`}></i> {item.name}
                    </Link>
                  </li>
                ))}
                <li className={` mb-1`} key={"item.id"}>
                  <Link to={"/"} onClick={() => logout()}>
                    <i className={`la la-sign-out`}></i> {"Logout"}
                  </Link>
                </li>
              </ul>
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
