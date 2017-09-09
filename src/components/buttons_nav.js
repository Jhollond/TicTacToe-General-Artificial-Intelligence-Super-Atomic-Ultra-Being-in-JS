import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  const include = [].concat(props.include);
  const customInclude = props.customInclude || {};
  const getLinkNav = ({address, label}) => (
    <Link to={address} className="btn btn-secondary">
      <span>
        {label}
      </span>
    </Link>
  )
  const getcustomNav = (func, label) => (
    <span className="btn btn-secondary"
      onClick={func}>
      {label}
    </span>
  )
  const alias = {
    'home': {
      address: '/',
      label: 'Main Menu'
    }
  }
  const buttons = include.reduce((acc, tag) => {
    let navButton;
    if (customInclude[tag]) {
      navButton = getcustomNav(customInclude[tag],tag);
    } else {
      navButton = getLinkNav(alias[tag])
    }
    return acc.concat(<span key={tag}>{navButton}</span>)
  },[])
  return (
    <div className="returnBtn">
      {buttons}
    </div>
  )
}
