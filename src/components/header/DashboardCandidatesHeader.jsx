


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
const candidatesuData = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/candidates-dashboard/dashboard",
    active: "active",
  },
  // {
  //   id: 2,
  //   name: "My Profile",
  //   icon: "la-user-tie",
  //   routePath: "/candidates-dashboard/my-profile",
  //   active: "",
  // },
  {
    id: 3,
    name: "My Resume",
    icon: "la la-file-invoice",
    routePath: "/candidates-dashboard/my-resume",
    active: "",
  },
  {
    id: 4,
    name: "Applied Jobs",
    icon: "la-briefcase",
    routePath: "/candidates-dashboard/applied-jobs",
    active: "",
  },
  {
    id: 5,
    name: "Job Alerts",
    icon: "la la-bell",
    routePath: "/candidates-dashboard/job-alerts",
    active: "",
  },
  // {
  //   id: 6,
  //   name: "Shortlisted Jobs",
  //   icon: "la-bookmark-o",
  //   routePath: "/candidates-dashboard/short-listed-jobs",
  //   active: "",
  // },
  // {
  //   id: 7,
  //   name: "CV manager",
  //   icon: "la la-file-invoice",
  //   routePath: "/candidates-dashboard/cv-manager",
  //   active: "",
  // },
  // {
  //   id: 8,
  //   name: "Packages",
  //   icon: "la-box",
  //   routePath: "/candidates-dashboard/packages",
  //   active: "",
  // },
  // {
  //   id: 9,
  //   name: "Messages",
  //   icon: "la-comment-o",
  //   routePath: "/candidates-dashboard/messages",
  //   active: "",
  // },
  {
    id: 10,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/candidates-dashboard/change-password",
    active: "",
  },
  {
    id: 11,
    name: "Logout",
    icon: "la-sign-out",
    routePath: "/logout",
    active: "",
  },
  {
    id: 12,
    name: "Delete Profile",
    icon: "la-trash",
    routePath: "/",
    active: "",
  },
];
import { useLocation } from "react-router-dom";
const DashboardCandidatesHeader = () => {
    const { pathname } = useLocation();
    const [navbar, setNavbar] = useState(false);



    const changeBackground = () => {
        if (window.scrollY >= 0) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
    }, []);

    return (
        // <!-- Main Header-->
        <header
            className={`main-header header-shaddow  ${
                navbar ? "fixed-header " : ""
            }`}
        >
            <div className="container-fluid">
                {/* <!-- Main box --> */}
                <div className="main-box">
                    {/* <!--Nav Outer --> */}
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link to="/">
                                    <img
                                        alt="brand"
                                        src="/images/logo.svg"
                                       
                                    />
                                </Link>
                            </div>
                        </div>
                        {/* End .logo-box */}

                        <HeaderNavContent />
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
                                    src="/images/resource/candidate-1.png"
                                   
                                />
                                <span className="name">My Account</span>
                            </a>

                            <ul className="dropdown-menu">
                                {candidatesuData.map((item) => (
                                    <li
                                        className={`${
                                            isActiveLink(
                                                item.routePath,
                                                pathname
                                            )
                                                ? "active"
                                                : ""
                                        } mb-1`}
                                        key={item.id}
                                    >
                                        <Link to={item.routePath}>
                                            <i
                                                className={`la ${item.icon}`}
                                            ></i>{" "}
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
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

export default DashboardCandidatesHeader;
