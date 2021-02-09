import React from "react";
import { Review } from "../../interfaces/reducerInterfaces";

interface IProps {
  reviewsArray: Review[] | undefined;
}

export default function FullTipsList({ reviewsArray }: IProps) {
  return (
    <div>
      {reviewsArray && reviewsArray.map((review) => <div>{review.title}</div>)}
    </div>
  );
}
