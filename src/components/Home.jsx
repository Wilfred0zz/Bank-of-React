import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="main-content">
        <h1 className="heading">
          <span>B</span>
          <span>a</span>
          <span>n</span>
          <span>k</span>
          <span>&nbsp;</span>
          <span>o</span>
          <span>f</span>
          <span>&nbsp;</span>
          <span>R</span>
          <span>e</span>
          <span>a</span>
          <span>c</span>
          <span>t</span>
        </h1>
        <br />
        <Link className="user-nav" to="/LogIn">
          Log in
        </Link>
        <br />
        <Link className="user-nav" to="/userProfile">
          User Profile
        </Link>
        <br />
        <Link className="user-nav" to="/Debits">
          Debits
        </Link>
        <br />
        <Link className="user-nav" to="/Credits">
          Credits
        </Link>
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}
export default Home;
