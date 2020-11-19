import React, { Component } from 'react';

import styled from 'styled-components';

import Singout from '../Signout';

import MenuLink from './MenuLink';

import { useContext } from 'react';
import UserContext from '../../lib/auth';
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  a {
    margin-left: 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    border-bottom: 5px solid transparent;
    padding-top: 5px;
  }
  a.active {
    border-bottom: 5px solid ${(props) => props.theme.red};
  }
`;

const Nav = (props) => {
  const user = useContext(UserContext);

  return (
    <Navigation className={`${props.className}`}>
      <MenuLink href="/">Home</MenuLink>
      <MenuLink href="/projects">Projects</MenuLink>
      {user && (
        <>
          <MenuLink href="/create-project">Create a project</MenuLink>

          <MenuLink
            href={{
              pathname: `${
                user.permissions.includes('ORGANIZATION') ? '/organization' : 'participant'
              }`,
              query: { id: user.id, edit: false },
            }}
          >
            Profile
          </MenuLink>

          {user.permissions.includes('ADMIN') && <MenuLink href="/dashboard">Dashboard</MenuLink>}
          <Singout />
        </>
      )}

      {!user && <MenuLink href={{ pathname: '/auth', query: { path: 'login' } }}>Sign in</MenuLink>}
    </Navigation>
  );
};

export default Nav;
