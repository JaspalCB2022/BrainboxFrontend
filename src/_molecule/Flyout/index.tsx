import "./index.css";
import close_circle from "../../Icons/close_circle.svg";
import expand from "../../Icons/expand.svg";
import collapse from "../../Icons/contract.png";
import { useState  } from "react";
import { FlyoutProps } from "./types";

function Flyout({
  onHide,
  title,
  style,
  children,
}: FlyoutProps) {
  const [width, setWidth] = useState<number | null>(null);
  const flyoutStyle = width ? { ...style, width: `${width}%` } : style;

  return (
    <>
      <div className="flyout" style={flyoutStyle}>
        <div className="flyout-header-box">
          <div className="flyout-expand-box">
            {width ? (
              <img
                src={collapse}
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() => setWidth(null)}
                alt="IImg"
              />
            ) : (
              <img
                src={expand}
                style={{ width: "15px", cursor: "pointer" }}
                onClick={() => setWidth(100)}
                alt="IImg"

              />
            )}
          </div>
          <div style={{ padding: "10px" }}>
            <img
              src={close_circle}
              alt="IImg"
              style={{ cursor: "pointer", width: "25px", marginLeft: "10px" }}
              onClick={() => {
                onHide();
                setWidth(null);
              }}
            />
          </div>
        </div>
        <div className="flyout-input slideup-input-wrapper">{title}</div>
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </>
  );
}

export default Flyout;
