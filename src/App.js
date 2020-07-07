import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits'

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
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
    return (
        <Router>
            <Route exact path='/' component={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path ="/debits" render={DebitsComponent}/>
        </Router>
    );
  }
}

export default App;
