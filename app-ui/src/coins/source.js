import React, { Component } from 'react';
import { CRYPTO_COMPARE_KEY } from './../../package.json';
import { FormControl, Select, MenuItem } from '@material-ui/core';

export default class Source extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      options: []
    };
  }

  componentDidMount() {
    return fetch("https://min-api.cryptocompare.com/data/blockchain/list?api_key=" + CRYPTO_COMPARE_KEY)
      .then(res => res.json())
      .then(res => {
        this.setState({options: Object.keys(res.Data)});
      })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});

    if (event.target.value) {
      const coins = this.props.getCoins();
      coins.push(event.target.value);
      this.props.setCoins(coins);
    }
  }

  render() {
    return (
      <FormControl style={{minWidth: '120px', padding: '5px'}}>
        <Select
          id="demo-simple-select"
          value={this.state.value}
          onChange={this.handleChange}
        >
        {this.state.options.map((currency) => {
          return (
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          )
        })}
        </Select>
      </FormControl>
    )
  }

}
