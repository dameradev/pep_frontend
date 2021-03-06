import React from 'react';
import Link from 'next/link';

import { HeaderStyled } from './styles';
import { Tabs, Tab, TextField } from '@material-ui/core';
import { Edit as EditIcon, Save as SaveIcon } from '@material-ui/icons';

const OrganizationHeader = (props) => {
  const {
    id,
    name,
    email,
    edit: editValue,
    slogan,
    handleChange,
    handleTabChange,
    value,
    userId,
  } = props;

  console.log(userId, id);

  const isOwner = userId && userId === id;

  return (
    <HeaderStyled className={props.className}>
      <div className="header__profile">
        <img
          className="header__profile-picture"
          src="https://www.logogenie.net/download/preview/medium/5319421"
        />
        <div className="header__profile-headers">
          {editValue === 'false' ? (
            <h3>{name ? name : 'Your name here'}</h3>
          ) : (
            <TextField
              className="form__input"
              type="text"
              onChange={(e) => handleChange(e)}
              value={name}
              name="name"
              placeholder="Organization name"
              label="Organization name"
              variant="outlined"
            />
          )}
          {editValue === 'false' ? (
            <h4>{slogan ? slogan : 'Your slogan here'}</h4>
          ) : (
            <TextField
              className="form__input"
              type="text"
              onChange={(e) => handleChange(e)}
              value={slogan}
              name="slogan"
              placeholder="Your slogan"
              label="Your slogan"
              variant="outlined"
            />
          )}
        </div>
        {isOwner &&
          (editValue === 'false' ? (
            <Link
              href={{
                pathname: `/organization`,
                query: { id, edit: editValue === 'false' ? true : false },
              }}
            >
              <a className="header__edit">
                <EditIcon color="primary" />
                <span>Edit</span>
              </a>
            </Link>
          ) : (
            <button type="submit" className="header__edit">
              <SaveIcon color="primary" />
              <span>Save</span>
            </button>
          ))}
      </div>

      <div className="header__bottom">
        <Tabs
          className="organization__nav"
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab className="header__nav__item" label="About us" />
          <Tab className="header__nav__item" label="Our projects" />
        </Tabs>
      </div>
    </HeaderStyled>
  );
};

export default OrganizationHeader;
