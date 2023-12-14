import "./index.css"
import React, { useEffect, useState } from 'react';
import menu from '../../Icons/menu.svg';
import menuarrow from '../../Icons/menuarrow.svg';

interface TopBarProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setOpenDrawer:React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer:boolean;
}

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
    <>
      <div className={`${props.visible ? 'topbar-box-with-nav' : 'topbar-box'}`}>
        {width > 800 ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="topbar-content">
              {props.visible === true ? (
                <img
                  className="menu"
                  src={menu}
                  alt="img"
                  onClick={() => props.setVisible(false)}
                />
              ) : (
                <img
                  className="menu"
                  src={menuarrow}
                  alt="img"
                  onClick={() => props.setVisible(true)}
                />
              )}
              <div className="topbar-title">{props.name}</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TopBar;