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
            <div>
              <li className='navigation__item'>
                <Link
                  to='/'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>Dashboard</span>
                </Link>
              </li>
            </div>
            <div>
              <li className='navigation__item'>
                <Link
                  to='/alertsManager'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>Alerts</span>
                </Link>
              </li>
            </div>
            <div>
              <li className='navigation__item'>
                <Link
                  to='/logs'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>View Logs</span>
                </Link>
              </li>
            </div>
            <div>
              <li className='navigation__item'>
                <Link
                  to='/visualizer'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>Visualize Logs</span>
                </Link>
              </li>
            </div>
            <div>
              <li className='navigation__item'>
                <Link
                  to='/indices'
                  className='navigation__link'
                  onClick={() => setToggle(!toggle)}
                >
                  <span>Index Patterns</span>
                </Link>
              </li>
            </div>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
