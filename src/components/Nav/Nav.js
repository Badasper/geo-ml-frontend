import React from 'react';

const Nav = (props) => {
  const { context } = props;
  const handleClick = () => {
    console.log(context);
  };
  return (
    <div className="nav">
      <button className="btn" type="button" onClick={handleClick}>
        Pull
      </button>
      <span>||</span>
      <button className="btn" type="button" onClick={handleClick}>
        Fetch
      </button>
    </div>
  );
};

export default Nav;
