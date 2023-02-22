/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h3>
        Welcome,
        {auth.firstName}
        !
      </h3>
    </div>
  );
}

export default Home;
