import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component{

  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, balance});
  }

  render(){
    web3.eth.getAccounts().then(console.log);

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}
          There are currently {this.state.players.length} entries,
          with a prize pool of {web3.utils.fromWei(this.state.balance, 'ether')} ETH
        </p>
        <hr />
        <form>
          <h4>Click to enter lottery</h4>
          <div>
            <label>Amount of ETH to enter</label>
            <input value = {this.state.value} onChange = {event => this.setState({value: event.target.value})}/>
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;