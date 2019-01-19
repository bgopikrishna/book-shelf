import React from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import Navlist from "./Navlist";

class Navbar extends React.Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }
  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              My Book Shelf
            </a>
            {
              // eslint-disable-next-line
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
            }
            <Navlist className="right hide-on-med-and-down" />
          </div>
        </nav>

        <Navlist className="sidenav" id="mobile-demo" />
      </React.Fragment>
    );
  }
}

export default Navbar;
