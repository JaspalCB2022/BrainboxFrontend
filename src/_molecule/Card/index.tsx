import React from "react";
import { CardWrapper } from "./styled";
import iconUser from "../../Icons/icon-user-male.svg";

const Card: React.FC = () => {
  return (
    <CardWrapper>
      <div className="card">
        <div className="card-body">
          <img src={iconUser} className="card-img-top" alt="user" />
          <h6 className="card-title"> Employees </h6>
          <h6 className="card-text">96</h6>
        </div>
      </div>
    </CardWrapper>
  );
};

export default Card;
