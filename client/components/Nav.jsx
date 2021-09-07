import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Nav = () =>{
  const [toggle, setToggle] = useState(true);

  return(
    <>
      {toggle &&
       <div className="navigation">
         <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

         <label htmlFor="navi-toggle" className="navigation__button">
           <span className="navigation__icon">&nbsp;</span>
         </label>

         <div className="navigation__background">&nbsp;</div>

         <nav className="navigation__nav">
           <ul className="navigation__list">
             <li className="navigation__item"><a href='' className="navigation__link"><span>01</span>Home</a></li>
             <li className="navigation__item"><a href="#" className="navigation__link"><span>02</span>View Logs</a></li>
             <li className="navigation__item"><a href="#" className="navigation__link"><span>03</span>Popular tours</a></li>
             <li className="navigation__item"><a href="#" className="navigation__link"><span>04</span>Stories</a></li>
             <li className="navigation__item"><a href="#" className="navigation__link"><span>05</span>Book now</a></li>
           </ul>
         </nav>
       </div>}
    </>
  );
};

export default Nav;