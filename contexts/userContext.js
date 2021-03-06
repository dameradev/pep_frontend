import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../lib/queries';

const UserContext = React.createContext({});

export const UserProvider = (props) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  });
  const { loading, data } = useQuery(CURRENT_USER_QUERY, { variables: { token: token } });
  let user = loading || !data?.me ? null : data?.me;

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};
export const UserConsumer = UserContext.Consumer;
export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
