import React, { Component } from 'react';

import Coins from './coins';
import Currency from './currency';
import Exchange from './exchange';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currency: 'USD',
      cryptoCoins: ['ETH', 'BTC', 'REP', 'XRP', 'LTC', 'USDT', 'BCH', 'LIBRA', 'XMR', 'EOS', 'BSV', 'BNB'],
    };
  }

  setCoins = (cryptoCoins) => {
    this.setState({cryptoCoins})
  }

  getCoins = () => {
    return this.state.cryptoCoins;
  }

  setCurrency = (currency) => {
    this.setState({currency});
  }

  getCurrency = () => {
    return this.state.currency;
  }

  render() {
    return (
      <div className="App">
        <Coins setCoins={this.setCoins} getCoins={this.getCoins} />

        <h4>Crypto Compare</h4>

        <Exchange getCurrency={this.getCurrency} getCoins={this.getCoins} />

        <Currency getCurrency={this.getCurrency} setCurrency={this.setCurrency} />
      </div>
    );
  }
}
