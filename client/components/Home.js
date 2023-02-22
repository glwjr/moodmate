/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export function Home(props) {
  const { firstName } = props;

  return (
    <div>
      <h3>
        Welcome,
        {firstName}
        !
      </h3>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => ({
  firstName: state.auth.firstName,
});

export default connect(mapState)(Home);
