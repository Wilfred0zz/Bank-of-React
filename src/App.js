import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.creditAdder = this.creditAdder.bind(this); 
    this.state = {
      accountBalance: 1337.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
    }
  }

  handler(userAmount){
    this.setState({
      accountBalance:this.state.accountBalance-userAmount 
    })
  }

  creditAdder(userAmount){
    this.setState({
        accountBalance: this.state.accountBalance + parseFloat(userAmount) //takes user amount as string wihtout parsing 
    });

    console.log("UserAmount type is:", typeof userAmount);
    console.log("Type of account balance is:", typeof this.state.accountBalance);
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  accountBalance={this.state.accountBalance}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} handler={this.handler}/>);
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} creditAdder={this.creditAdder}/>);
    return (
        <Router>
            <Route exact path='/' component={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path ="/debits" render={DebitsComponent}/>
            <Route exact path = "/Credits" render={CreditsComponent}/> 
        </Router>
    );
  }
}

export default App;
