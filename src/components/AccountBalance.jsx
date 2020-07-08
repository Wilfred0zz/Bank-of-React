import React, { Component } from "react";

class AccountBalance extends Component {
  render() {
    return (
      <div className="second-heading">
        Balance: {this.props.accountBalance.toFixed(2)}
      </div>
    );
  }
}

export default AccountBalance;
