import React from 'react';
import './DisplayEventScreen.css';

export const DisplayEventScreen = () => {
  return (
    <div className="container">
      <div className="displayEvent">
        <h4>date and time of the event</h4>
        <div>
          <div>
            <h4>tag 1</h4>
          </div>
          <div>
            <h4>tag 1</h4>
          </div>
          <div>
            <h4>tag 1</h4>
          </div>
          <div>
            <h4>tag 1</h4>
          </div>
        </div>

        <div>
          <button onClick={() => {}}></button>
        </div>

        {/* <div>
          coordinates=
          {{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'A place'}
          description={'Descriptions go here'}
        </div> */}

        <div className="addressOfEvent">
          <h4>here goes the address</h4>
        </div>

        <div className="descriptionOfEvent">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
          </p>
        </div>

        <div className="userEventStatusButtons">
          <label>Going</label>
          <button type="button">I'm going!</button>
          <label>Interested</label>
          <button type="button">I'm interested</button>
        </div>
      </div>
    </div>
  );
};
