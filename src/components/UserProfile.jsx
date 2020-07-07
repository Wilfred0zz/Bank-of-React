import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
class UserProfile extends Component {
  render() {
    return (
        <div>
        <Link to="/">Home</Link>
          <h1>User Profile</h1>
          <AccountBalance accountBalance={this.props.accountBalance}/>
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
        </div>
    );
  }
}

export default UserProfile;