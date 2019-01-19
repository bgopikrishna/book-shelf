import React from "react";
import { NavLink } from "react-router-dom";

const Navlist = ({ className, id = "" }) => {
  return (
    <ul className={className} id={id}>
      <li>
        <NavLink to="/">To Read</NavLink>
      </li>
      <li>
        <NavLink to="/">Currently Reading</NavLink>
      </li>
      <li>
        <NavLink to="/">Read</NavLink>
      </li>
      <li>
        <NavLink to="/search">
          <i className="material-icons">search</i>
        </NavLink>
      </li>
    </ul>
  );
};

export default Navlist;

// {
//   /* <ul className={className} id={id}>
//       <li>
//         <Link to="/">Search</Link>
//       </li>
//       <li>
//         <Link to="/">To Read</Link>
//       </li>
//       <li>
//         <Link to="/">Currently Reading</Link>
//       </li>
//       <li>
//         <Link to="/">Read</Link>
//       </li>
//     </ul> */
// }
