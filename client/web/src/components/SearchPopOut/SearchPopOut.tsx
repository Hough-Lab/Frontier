import React, { useState } from 'react';
import './SearchPopOut.css';
import { FaSearchLocation } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export const SearchPopOut = () => {
  const [showSearchPopout, setSearchPopout] = useState(false);

  const toggleShowSearchPopout = () => {
    setSearchPopout((showSearchPopout) => !showSearchPopout);
  };

  return (
    <div>
      <button className="searchBarButton">
        onClick=
        {() => {
          toggleShowSearchPopout();
        }}
        <FaSearchLocation className="myReact-icons" size={50} />
      </button>
    </div>
  );
};
