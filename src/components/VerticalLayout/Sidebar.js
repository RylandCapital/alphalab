import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {} from "../../store/actions";

import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="vertical-menu">
          <div className="navbar-brand-box">
            <Link to="/dashboard" className="logo logo-dark">
              <span className="logo-sm">
                <img
                  src={
                    "http://alphadefi.fund/wp-content/uploads/2022/03/logo-nobackground-500.png"
                  }
                  alt=""
                  height="90"
                />
              </span>
              <span className="logo-lg">
                <img
                  src={
                    "http://alphadefi.fund/wp-content/uploads/2022/03/logo-nobackground-500.png"
                  }
                  alt=""
                  height="90"
                />
              </span>
            </Link>

            <Link to="/dashboard" className="logo logo-light">
              <span className="logo-sm">
                <img
                  src={
                    "http://alphadefi.fund/wp-content/uploads/2022/03/logo-nobackground-500.png"
                  }
                  alt=""
                  height="90"
                />
              </span>
              <span className="logo-lg">
                <img
                  src={
                    "http://alphadefi.fund/wp-content/uploads/2022/03/logo-nobackground-500.png"
                  }
                  alt=""
                  height="90"
                />
              </span>
            </Link>
          </div>
          <div data-simplebar className="h-100">
            {this.props.type !== "condensed" ? (
              <SidebarContent />
            ) : (
              <SidebarContent />
            )}
          </div>
          <div className="sidebar-background"></div>
        </div>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
