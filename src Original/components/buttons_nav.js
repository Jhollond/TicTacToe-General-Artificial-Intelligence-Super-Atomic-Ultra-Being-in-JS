import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  const include = [].concat(props.include);
  const customInclude = props.customInclude || {};
  const getLinkNav = ({address, label}) => (
    <Link to={address}>
      <span className="btn btn-secondary">
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
  const alts = {
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
      console.log(tag);
      navButton = getLinkNav(alts[tag])
    }
    return acc.concat(<span key={tag}>{navButton}</span>)
  },[])
  return (
    <div className="returnBtn">
      {buttons}
    </div>
  )
}
