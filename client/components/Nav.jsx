import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='navigation'>
      <input
        type='checkbox'
        className='navigation__checkbox'
        id='navi-toggle'
        checked={toggle}
        onChange={() => setToggle(!toggle)}
      />

      <label htmlFor='navi-toggle' className='navigation__button'>
        <span className='navigation__icon'>&nbsp;</span>
      </label>

      <div className='navigation__background'>&nbsp;</div>

      <nav className='navigation__nav'>
        {toggle && (
          <ul className='navigation__list'>
            <Link to='/'>
              {' '}
              <li className='navigation__item'>
                <a
                  href=''
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>01</span>Home
                </a>
              </li>
            </Link>
            <Link to='/logs'>
              <li className='navigation__item'>
                <a
                  href='#'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>02</span>View Logs
                </a>
              </li>
            </Link>
            <Link to='/visualizer'>
              <li className='navigation__item'>
                <a
                  href='#'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>03</span>Visualize Logs
                </a>
              </li>
            </Link>
            <Link to='/alerts'>
              <li className='navigation__item'>
                <a
                  href='#'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>04</span>Manage Alerts
                </a>
              </li>
            </Link>
            <Link to='/indeces'>
              <li className='navigation__item'>
                <a
                  href='#'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>05</span>Create An Index
                </a>
              </li>
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
