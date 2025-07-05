import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

export let contractorMenuData  = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/contractor-dashboard/dashboard",
    active: "active",
  },
  {
    id: 2,
    name: "My Profile",
    icon: "la-user-tie",
    routePath: "/contractor-dashboard/my-profile",
    active: "",
  },
  {
    id: 3,
    name: "My Company",
    icon: "la la-file-invoice",
    routePath: "/contractor-dashboard/my-company",
    active: "",
  },
  {
    id: 4,
    name: "Applied Contracts",
    icon: "la-briefcase",
    routePath: "/contractor-dashboard/applied-contracts",
    active: "",
  },
  {
    id: 5,
    name: "Contract Alerts",
    icon: "la la-bell",
    routePath: "/contractor-dashboard/job-alerts",
    active: "",
  },

  // {
  //   id: 9,
  //   name: "Messages",
  //   icon: "la-comment-o",
  //   routePath: "/contractor-dashboard/messages",
  //   active: "",
  // },
  {
    id: 10,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/contractor-dashboard/change-password",
    active: "",
  },
  // {
  //   id: 11,
  //   name: "Logout",
  //   icon: "la-sign-out",
  //   routePath: "/login",
  //   active: "",
  // },
  {
    id: 12,
    name: "Delete Profile",
    icon: "la-trash",
    routePath: "/",
    active: "",
  },
];


import { useLocation } from "react-router-dom";
const DashboardContractorSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;


  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {contractorMenuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, pathname) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
            >
              <Link to={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* End navigation */}

        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            `Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>`
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{" "}
          {/* <!-- Pie Graph --> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardContractorSidebar;