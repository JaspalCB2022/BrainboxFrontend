import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavWrapper } from "./styled";
import dashboard from "../../Icons/dahboard.svg";
import configurationWhite  from "../../Icons/configuration-white.svg";
import controlWhite  from "../../Icons/control-white.svg";
import management  from "../../Icons/management.svg";
import pointer from "../../Icons/pointer.svg";
import chatlogo from "../../Icons/chatlogo.svg"
import rectangle from "../../Icons/rectangle 4.svg";
import logout from "../../Icons/logout.svg";
import navArrow from "../../Icons/open_nav.svg";
  
  interface SubNav {
    name: string;
    url: string;
  }
  
  interface NavContent {
    name: string;
    icon: string;
    activeIcon: string;
    open?: boolean;
    subNav?: SubNav[];
    url?: string;
    
  }

  interface NavBarProps {
    name:string,
    setName: React.Dispatch<React.SetStateAction<string>>, 
    visible: boolean ,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    openDrawer:boolean,
    setOpenDrawer:React.Dispatch<React.SetStateAction<boolean>>

  }


function NavBar(props: NavBarProps) {
  const [index, setIndex] = useState<number[]>([]);
  const [id, setId] = useState<number | undefined>();

  const navigate = useNavigate();
  const location = useLocation();

  const pathToName: Record<string, { id: number; name: string }> = {
    "pr-status-check": { id: 0, name: "PR Status Check" },
  };

  useEffect(() => {
    const path = location.pathname?.split("/")[1];
    props.setName(pathToName[path]?.name);
    setId(pathToName[path]?.id);
    openNav(pathToName[path]?.id);
  }, []);

  let closeNav = (i: number | undefined) => {
    setIndex([]);
  };

  let openNav = (i: number | undefined) => {
    setIndex(i !== undefined ? [i] : []);
  };

  let navContent : NavContent[] = [
    {
      name: "Customer",
      icon: dashboard,
      activeIcon: dashboard,
      url: '/customer',
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
    props.setName(name);
    setId(id);
    index.includes(id as number) ? closeNav(id) : openNav(id);
  };

  return (
    <NavWrapper width={props.visible === true ? '250px' : '60px'}>
      <div style={{ padding: "20px" }}>
        <div className="navwrapper-logo-box">
          <div className="navbar-logo">
            <img src={chatlogo} className="navbar-logo-img" alt="logo"></img> ChatBot
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
                    // navigate(nav.url);
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
                  <div className={props.visible === true ? 'subnav-box' : "subnav"}>
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
        <div className="navbar-logout" onClick={() => navigate("/")}>
          <img src={logout} style={{ width: "13px" }} alt="logout-icon"></img>
        </div>
      </div>
    </NavWrapper>
  );
}

export default NavBar;
