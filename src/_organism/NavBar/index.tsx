import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavWrapper } from "./styled";
import dashboard from "../../Icons/dahboard.svg";
import configurationWhite from "../../Icons/configuration-white.svg";
import controlWhite from "../../Icons/control-white.svg";
import management from "../../Icons/management.svg";
import pointer from "../../Icons/pointer.svg";
import chatlogo from "../../Icons/chatlogo.svg";
import rectangle from "../../Icons/rectangle 4.svg";
import logout from "../../Icons/logout.svg";
import navArrow from "../../Icons/open_nav.svg";
import feature from "../../Icons/feature_icon.svg";
import Cookies from "js-cookie";
import { NavBarProps, NavContent } from "./types";
import { useGetlogoutMutation } from "../../api/logoutApi";

function NavBar(props: NavBarProps) {
  const [index, setIndex] = useState<number[]>([]);
  const [id, setId] = useState<number | undefined>();

  const navigate = useNavigate();
  const location = useLocation();

  const [saveLogout] = useGetlogoutMutation();

  // const pathToName: Record<string, { id: number; name: string }> = {
  //   "pr-status-check": { id: 0, name: "PR Status Check" },
  // };

  const pathToName = {
    customers: { id: 0, name: "Customers" },
    features: { id: 1, name: "Features" },
  };

  useEffect(() => {
    const path = location.pathname?.split("/")[1];
    props.setName(pathToName[path as keyof typeof pathToName]?.name || " ");
    setId(pathToName[path as keyof typeof pathToName]?.id || 0);
    openNav(pathToName[path as keyof typeof pathToName]?.id || 0);
  }, []);

  let closeNav = (i: number | undefined) => {
    setIndex([]);
  };

  let openNav = (i: number | undefined) => {
    setIndex(i !== undefined ? [i] : []);
  };

  const handleLogout = () => {
    saveLogout({});
    Cookies.remove("authToken");
    navigate("/");
  };

  let navContent: NavContent[] = [
    {
      name: "Customer",
      icon: dashboard,
      activeIcon: dashboard,
      url: "/customers",
    },
    {
      name: "Features",
      icon: feature,
      activeIcon: feature,
      url: "/features",
    },
    // {
    //   name: "Dashboard",
    //   icon: dashboard,
    //   activeIcon: dashboard,
    //   url: '/dashboard',
    // },
    // {
    //   name: "Configurations",
    //   icon: configurationWhite,
    //   activeIcon: configurationWhite,
    //   open: true,
    //   subNav: [
    //     { name: "Commodity code", url: "/pr-status-check/commodity-code" },
    //     { name: "Company codes", url: "/pr-status-check/company-code" },
    //     { name: "Currencies", url: "/pr-status-check/currency-code" },
    //     { name: "Plants", url: "/pr-status-check/plants" },
    //     { name: "Purchase Organization", url: '/pr-status-check/po' },
    //     { name: "Suppliers", url: "/pr-status-check/suppliers" },
    //     { name: "UOM", url: '/pr-status-check/uom' },
    //   ],
    // },
    // {
    //   name: "PR Access control",
    //   icon: controlWhite,
    //   activeIcon: controlWhite,
    //   url: '/pr-status-check/access-control',
    // },
    // {
    //   name: "Management",
    //   icon: management,
    //   activeIcon: management,
    //   open: false,
    // },
  ];

  let onNameClick = (id: number | undefined, name: string) => {
    localStorage.setItem("selectedId", id!.toString());
    props.setName(name);
    console.log("id>>>", id);
    setId(id);
    index.includes(id as number) ? closeNav(id) : openNav(id);
  };

  return (
    <NavWrapper width={props.visible === true ? "250px" : "60px"}>
      <div style={{ padding: "20px" }}>
        <div className="navwrapper-logo-box">
          <div className="navbar-logo">
            <img
              src={chatlogo}
              className={
                props.visible ? "navbar-logo-img" : "navbar-logo-img-nav"
              }
              alt="logo"
            ></img>
            {props.visible ? <span>BrainBox</span> : null}
          </div>
        </div>
      </div>
      <div className="navwrapper-mid-section">
        <div>
          {navContent.map((nav, i) => {
            return (
              <>
                <div
                  key={i}
                  className="navwrapper-mid-section-nav"
                  onClick={() => {
                    onNameClick(i, nav.name);
                    navigate(nav.url!);
                  }}
                >
                  {i === id ? (
                    <img
                      src={nav.activeIcon}
                      className="navbar-icon-active "
                      alt="active-icon"
                    ></img>
                  ) : (
                    <img
                      src={nav.icon}
                      className="navbar-icon "
                      alt="icon"
                    ></img>
                  )}
                  <div
                    className={
                      id === i
                        ? "navcontent-name color-orange"
                        : "navcontent-name"
                    }
                  >
                    {nav.name}
                  </div>
                  {nav.open ? (
                    index.includes(i) ? (
                      <img
                        src={navArrow}
                        className="navwrapper-images"
                        onClick={() => closeNav(id)}
                        alt="nav-arrow"
                      />
                    ) : id === i ? (
                      <img
                        src={navArrow}
                        className="navwrapper-images"
                        style={{ transform: "rotate(270deg)" }}
                        onClick={() => openNav(id)}
                        alt="nav-arrow"
                      />
                    ) : (
                      <img
                        src={navArrow}
                        className="navwrapper-images"
                        style={{ transform: "rotate(270deg)" }}
                        onClick={() => openNav(id)}
                        alt="nav-arrow"
                      />
                    )
                  ) : null}
                </div>
                {id === i && nav.open && index.includes(i) ? (
                  <div
                    className={props.visible === true ? "subnav-box" : "subnav"}
                  >
                    {nav.subNav &&
                      nav.subNav.map((sub, id) => {
                        return (
                          <div style={{ display: "flex" }} key={id}>
                            <div style={{ paddingTop: "6px" }}>
                              <img src={rectangle} alt="rectangle"></img>
                            </div>
                            <Link
                              className="subnav-content-box"
                              to={sub.url}
                              style={
                                location.pathname === sub.url
                                  ? { color: "white" }
                                  : {}
                              }
                            >
                              {sub.name}
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
        <div className="navbar-logout" onClick={handleLogout}>
          <img src={logout} style={{ width: "13px" }} alt="logout-icon"></img>
        </div>
      </div>
    </NavWrapper>
  );
}

export default NavBar;
