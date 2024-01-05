import "./index.css"
import React, { useEffect, useState } from 'react';
import menu from '../../Icons/menu.svg';
import menuarrow from '../../Icons/menuarrow.svg';
import notification from "../../Icons/notifications.svg"
import profile from "../../Icons/profle.svg"
import { TopBarProps } from "./types";

const TopBar: React.FC<TopBarProps> = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // <>
    //   <div className={`${props.visible ? 'topbar-box-with-nav' : 'topbar-box'}`}>
    //     {width > 800 ? (
    //       <div style={{ display: 'flex', alignItems: 'center',width:"100%" }}>
    //         <div className="topbar-content">
    //           <div className="topbar-inside">
    //           {props.visible === true ? (
    //             <img
    //               className="menu"
    //               src={menu}
    //               alt="img"
    //               onClick={() => props.setVisible(false)}
    //             />
    //           ) : (
    //             <img
    //               className="menu"
    //               src={menuarrow}
    //               alt="img"
    //               onClick={() => props.setVisible(true)}
    //             />
    //           )}
    //           </div>
    //           <div className="topbar-profile">
    //             <img className="topbar-img" src={notification} alt="notification" />
    //             <img className="topbar-img" src={profile} alt="profile" />
    //           </div>
    //         </div>
    //       </div>
    //     ) : null}

    //   </div>
    //     <div className="topbar-title">{props.name}</div>
    // </>
    <div>
    <div className={ `${props.visible ===true ? 'topbar-box-with-nav': 'topbar-box' } `}>
        {
            width > 800
                ?
                <>
                    <div style={{ display: 'flex',alignItems:'center' }}>
                        <div className='topbar-content' >
                           {props.visible === true ? <img className='menu' src={menu} alt='img '  onClick={()=> props.setVisible(false)}   / > : <img className='menu' src={menuarrow} alt='img'    onClick={()=> props.setVisible(true)}  / > }
                        </div>
                    </div>
                    <img src={profile} alt='img' />
                </>
                :
                null
        }
    </div>
    <div className={ `${props.visible ===true ? 'topbar-title-with-nav': 'topbar-title' } `}>{props.name}</div>
</div>
  );
};

export default TopBar;
