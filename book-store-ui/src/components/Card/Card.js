import React from "react";
import Table from "../Table/Table";
import StarRating from "../Rating/StarRating";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="containter">
      <div className="row">
        <div className="column-left">
          <img className="avatar" src={props.storeImage} alt={props.name} />
        </div>
        <div className="column-right">
          <StarRating rating={props.rating} store={props.storeName} />
          <Table books={props.books} />
        </div>
      </div>
      <div className="row">
        <div className="column-left">
          <p>
            {props.establishmentDate} - {props.website}
          </p>
        </div>
        <div className="column-right">
          <img
            height="30"
            width="50"
            src={props.countryFlag}
            alt={props.countryCode}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
