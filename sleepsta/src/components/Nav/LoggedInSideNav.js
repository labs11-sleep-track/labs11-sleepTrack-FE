import React from "react";
import logo from "./sleep.png";
import styled from "styled-components";
import { NavLink } from "reactstrap";

import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./SideBarNav.css";

class LoggedInSideNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div class="wrapper">
        <div id="content">
          <nav id="menuButton" class="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              {/* possible title */}

              {/* <a href="#" id="sidebarCollapse" className="SleepstaTitle">SLEEPSTA</a> */}

              {/* <button type="button" id="sidebarCollapse" className="btn btn-info">
                <div className="buttonTitle">
                    <span>SLEEPSTA</span>
                    </div>
                </button> */}
            </div>
          </nav>
        </div>

        <nav id="sidebar">
          <div className="sidebar-header">
            <NavLink href="/dashboard">
              <div className="sleepTitle">
                <img src={logo} className="logo" alt="sleep"></img>
                {/* SLEEP<i>STA</i> */}
              </div>
            </NavLink>
          </div>

          <ul className="list-unstyled components">
            <div className="catchPhrase">
              <p>Sleep Harder. Live Smarter.</p>
            </div>

            <li>
              <Link style={{ textDecoration: "none" }} to="/dashboard">
                <div>
                  <i class="fas fa-chart-bar" />&nbsp;&nbsp;Dashboard
                </div>
              </Link>
            </li>

            <li>
              <Link style={{ textDecoration: "none" }} to="/blogs">
                <div>
                  <i className="fas fa-bed" />&nbsp;&nbsp;Sleep Blogs
                </div>
              </Link>
            </li>

            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fas fa-user-circle"></i>&nbsp;&nbsp;Account</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">

                    <li>
                        <Link style={{textDecoration: "none"}} to="/profile">
                            <div><i class="fas fa-user"></i>&nbsp;&nbsp;Profile</div>
                        </Link>
                    </li>

                    <li>
                        <Link style={{textDecoration: "none"}} to="/premium">
                            <div><i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;Payment</div>
                        </Link>
                    </li>

                </ul>
            </li>

            <li>
              <div>
                <a onClick={this.logout}>
                  <i class="fas fa-sign-out-alt" />&nbsp;&nbsp;Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };
}

export default withRouter(LoggedInSideNav);
