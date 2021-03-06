import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import NProgress from 'nprogress';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import Nav from '../Nav';
import Logo from '../Logo';

Router.onRouteChangeStart = NProgress.start;
Router.onRouteChangeComplete = NProgress.done;
Router.onRouteChangeError = NProgress.done;

import { respondTo } from '../../lib/respondTo';
const LoginNav = styled.header`
  background: ${(props) => props.theme.blue};
  width: 100%;
  height: 20px;
  font-size: 1rem;
  color: white;

  nav {
    width: ${(props) => props.theme.maxWidth};
    text-align: right;
  }
`;

const HeaderStyles = styled.header`
  height: 70px;
  background: ${(props) =>
    props.router.route === '/'
      ? props.headerBgnColor
        ? props.theme.blue
        : 'transparent'
      : props.theme.blue};
  transition: background-color 0.5s ease-in-out;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;

  box-shadow: 0px 3px 6px #00000029;
  .header {
    width: 90%;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      color: ${(props) => props.headerBgnColor && 'white'};
    }

    .hamburger-icon {
      color: white;
      display: none;
      ${respondTo.tablet` 
        display: block;
      `}
    }

    .nav {
      ${respondTo.tablet` 
      display: none;
    `}
    }
  }
`;

class Header extends Component {
  state = {
    windowScroll: false,
  };

  listenScrollEvent = (e) => {
    window.pageYOffset > 70
      ? this.setState({ windowScroll: true })
      : this.setState({ windowScroll: false });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent, false);
  }

  render() {
    const { router, handleDrawerToggle, drawerOpen } = this.props;
    return (
      <HeaderStyles headerBgnColor={this.state.windowScroll} router={router}>
        {/* <LoginNav>
            <nav><p>For Organizations</p> <p>For Participants</p></nav>        
        </LoginNav> */}
        <div className="header">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Nav className="nav" />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => handleDrawerToggle(drawerOpen)}
            // className="icon-button"
            className="hamburger-icon"
          >
            <Menu fontSize={'large'} />
          </IconButton>
        </div>
      </HeaderStyles>
    );
  }
}

export default withRouter(Header);
