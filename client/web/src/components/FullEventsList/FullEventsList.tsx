import React from "react";
import { Event } from "../../interfaces/reducerInterfaces";
import "./FullEventsList.css";
import moment from "moment";

interface IProps {
  eventsArray: Event[] | undefined;
}

export default function FullEventsList({ eventsArray }: IProps) {
  return (
    <div className="eventsListContainer">
      {eventsArray &&
        eventsArray.map((event) => {
          return (
            <div className="eventCardContainer">
              <div className="imageContainer">
                <img
                  src="https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg"
                  height="100"
                  width="100"
                  alt="summer cocktails"
                  className="tempImage"
                />
              </div>
              <div className="eventInfoContainer">
                <div className="eventName">{event.title}</div>
                <div className="eventDescription">{event.description}</div>
                <div className="eventDateTimeContainer">
                  <div className="eventDate">
                    {moment().format("MMMM Do YYYY")}
                  </div>
                  <div className="eventTime">{moment().format(" h:mm a")}</div>
                </div>
              </div>
              {/* <div>{event.dateFrom}</div>
              <div>{event.dateTo}</div> */}
            </div>
          );
        })}
    </div>
  );
}
