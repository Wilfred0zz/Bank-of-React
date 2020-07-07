import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component{
    constructor(props) {
        super(props);
        this.state = {
          PastDebts:[],
          newDescription:'',
          newDate:'',
          newAmount:0,
        };
      }

    fetchDebits= async(event) =>{
        try {
            let response = await fetch('https://moj-api.herokuapp.com/debits', {method: 'GET',});
            const result = await response.json();
            const status = response.status; 
            if (status === 400 || status === 500) {
                console.log(result.error)
            } else{
                this.setState({PastDebts:result});
                console.log(result);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    componentDidMount(){
        this.fetchDebits();
    }

    onChange= (event) =>{//sets the Zip state to that of the one user entered
        this.setState({newDescription : event.target.value});
        console.log(this.state.newDescription)
        this.setState({newAmount: event.target.value})
        console.log(this.state.newAmount)
    }

    onSubmit=() =>{
        if(this.state.newDescription===""||this.state.newAmount === ""){
            alert("please make sure you filled out both options before submitting")
        }
        this.setState({newDate: new Date(Date.now()).toLocaleDateString()});
        console.log(this.state.newDate)
        this.AddDebit();
    }

    AddDebit = async() =>{
        const newDebit = {
            "description" : this.state.newDescription,
            "amount" : this.state.newAmount,
            "date" : this.state.newDate,
        }
        try{
            const response = await fetch('https://moj-api.herokuapp.com/debits', {
                headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(newDebit)
              });
              const status = response.status;
              const result = await response.json();
        
              if (status === 400 || status === 500) {
                alert(result.error);
              } else {
                console.log("Successfully sent information");
              }

        }catch (error) {
            alert("there is an error");
            console.log(error);
          } 
    }


    render(){
        const {newDescription}=this.state.newDescription;
        const {newAmount}= this.state.newAmount;
        return (
            <div>
                <header><h1></h1>Debits</header>
                <div className="AllDebits">
                    <ul>
                        {this.state.PastDebts.map((info) => (
                            <p>
                                {"$"+info.amount + " "} 
                                {info.description + " "} 
                                {info.date}    
                            </p>
                        ))}
                    </ul>
                </div>
                <form onSubmit={this.onSubmit}>
                    <label>Description: </label>
                    <input type="text" onChange={this.onChange} value={newDescription}/> 
                    <label>Amount: </label>
                    <input type="text" onChange={this.onChange} value={newAmount}/>
                    <input type="submit" value="Add Debit"/>
                        
                </form>
        
              

                Balance: {this.props.accountBalance}
                <br/>
                <Link to="/">Home</Link>
                <br/>
                <Link to ="/LogIn">Log in</Link>
                <br/>
                <Link to="/userProfile">User Profile</Link>
            </div>
        )
    }   
}

export default Debits;