import "./sidebar.scss";
import { AnimatePresence, motion } from "framer-motion";
import { GoHome } from "react-icons/go";
import { RiMessage3Line, RiMenuUnfoldFill } from "react-icons/ri";
import { TbBrandGoogleAnalytics, TbUsers } from "react-icons/tb";
import { AiOutlineFile } from "react-icons/ai";
import { GiChainedHeart } from "react-icons/gi";
import { FaLock, FaMoneyBill, FaBars } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { BiCog, BiSearch } from "react-icons/bi";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import companyLogo from "../../assets/companyLogoBig.png";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <GoHome />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <TbUsers />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <RiMessage3Line />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <TbBrandGoogleAnalytics />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiOutlineFile />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <TbUsers />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <TbUsers />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <GiChainedHeart />,
  },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      width: "300px",
      padding: "10px 15px",
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="main_container">
      <motion.div
        className="sidebar"
        animate={{
          width: isOpen ? "300px" : "60px",
          transition: {
            duration: 0.2,
            type: "spring",
            damping: 12,
          },
        }}
      >
        <div className="top_section">
          {isOpen && (
            <AnimatePresence>
              <motion.div className="company_logo">
                <img
                  src={companyLogo}
                  alt="Company logo"
                  className="main_img"
                />
              </motion.div>
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="main_text"
              >
                Some<span className="">thing</span>
              </motion.h1>
            </AnimatePresence>
          )}

          <div className="bars">
            {isOpen ? (
              <FaBars onClick={toggle} />
            ) : (
              <RiMenuUnfoldFill onClick={toggle} />
            )}
          </div>
        </div>
        <div className="search">
          <div
            className="search_icon"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                type="text"
                placeholder="Search here"
              />
            )}
          </AnimatePresence>
        </div>

        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  route={route}
                  key={index}
                />
              );
            }
            return (
              <NavLink to={route.path} key={index} className="navLink">
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
