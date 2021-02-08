import React, { useState } from "react";
import "./StarComponent.css";

interface IProps {
  totalStars: number;
}

const Star = ({ selected = false, onClick = (f: any) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

export const StarRating = ({ totalStars }: IProps) => {
  const [starsSelected, selectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
    </div>
  );
};
