import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
class UserProfile extends Component {
  render() {
    return (
      <div className="main-content">
        <h1 className="heading">User Profile</h1>
        <Link className="user-nav" to="/">
          Home
        </Link>
        <Link className="user-nav" to="/LogIn">
          Log in
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
        <div>Username: {this.props.userName}</div>
        <div>Member Since: {this.props.memberSince}</div>
      </div>
    );
  }
}

export default UserProfile;
