import "./StarRating.css";

const StarRating = (props) => {
  return (
    <div className="row">
      <div>
        <h2 align="left">{props.store}</h2>
      </div>
      <div className="rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= props.rating ? "on" : "off"}
              s
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
