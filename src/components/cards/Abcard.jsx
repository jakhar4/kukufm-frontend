import React from "react";
import "./Abcard.css";
import { Link } from "react-router-dom";

const Abcard = (props) => {
  return (
    <Link to={"/audiobook/" + props.id} className="card-link">
      <div
        className="card"
        style={{
          backgroundImage: `url(${props.coverImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="overlay">
          <div className="rating_stars_parent">
            {Array.from({ length: props.stars }, (_, index) => (
              <img
                key={index}
                className="rating_stars"
                src="https://www.freepnglogos.com/uploads/star-png/file-gold-star-svg-wikimedia-commons-6.png"
                alt="star"
              />
            ))}
          </div>
          {props.title && <div className="title">{props.title}</div>}
          {props.description && (
            <div className="description">
              {props.description.length > 126
                ? props.description.substring(0, 125) + "..."
                : props.description}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Abcard;
