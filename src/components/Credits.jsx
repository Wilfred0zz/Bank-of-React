import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PastDebts: [],
      newDescription: "",
      newAmount: 0,
    };
  }

  fetchCredits = async (event) => {
    try {
      let response = await fetch("https://moj-api.herokuapp.com/credits", {
        method: "GET",
      });
      const result = await response.json();
      const status = response.status;
      if (status === 400 || status === 500) {
        console.log(result.error);
      } else {
        this.setState({ PastDebts: result });
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchCredits();
  }

  onChange = (string, event) => {
    this.setState({ [string]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.newDescription === "" || this.state.newAmount === "") {
      alert("please make sure you filled out both options before submitting");
    }
    this.AddCredit();
  };

  AddCredit = async (event) => {
    const newCredit = {
      description: this.state.newDescription,
      amount: this.state.newAmount,
      date: new Date(Date.now()).toLocaleDateString(),
    };
    console.log(newCredit);
    let CopyPastDebts = [...this.state.PastDebts, newCredit];
    this.props.creditAdder(this.state.newAmount);
    this.setState({ PastDebts: CopyPastDebts });
    try {
      const response = await fetch("https://moj-api.herokuapp.com/credits", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newCredit),
      });
      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else {
        console.log("Successfully sent information");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { newDescription } = this.state.newDescription;
    const { newAmount } = this.state.newAmount;
    return (
      <div className="main-content">
        <h1 className="heading">Credits</h1>
        <Link className="user-nav" to="/">
          Home
        </Link>
        <br />
        <Link className="user-nav" to="/LogIn">
          Log in
        </Link>
        <br />
        <Link className="user-nav" to="/userProfile">
          User Profile
        </Link>
        <Link className="user-nav" to="/Debits">
          Debits
        </Link>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <div className="AllCredits">
          <ul>
            {this.state.PastDebts.map((info) => (
              <p>
                {"$" + info.amount + " "}
                {info.description + " "}
                {info.date}
              </p>
            ))}
          </ul>
        </div>
        <form onSubmit={this.onSubmit}>
          <label>Description: </label>
          <input
            type="text"
            onChange={(event) => this.onChange("newDescription", event)}
            value={newDescription}
          />
          <label>Amount: </label>
          <input
            type="text"
            onChange={(event) => this.onChange("newAmount", event)}
            value={newAmount}
          />
          <input type="submit" value="Add Credit" />
        </form>
      </div>
    );
  }
}

export default Credits;
