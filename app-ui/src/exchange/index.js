import React, { Component } from 'react';
import { CRYPTO_COMPARE_KEY } from './../../package.json';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      coins: this.props.getCoins(),
      currency: this.props.getCurrency()
    }
  }

  componentDidMount() {
    this.requestData();
  }

  componentDidUpdate(a, b) {
    if (a.getCurrency() !== b.currency) { return this.requestData(); }
    if (a.getCoins().length !== b.coins.length) { return this.requestData(); }
  }

  requestData() {
    const coins = this.props.getCoins().join(',');
    const currency = this.props.getCurrency();

    return fetch(
        "https://min-api.cryptocompare.com/data/pricemultifull"
        + "?fsyms=" + coins + "&tsyms=" + currency + "&api_key=" + CRYPTO_COMPARE_KEY
      )
      .then(res => res.json())
      .then(res => {
        this.handleData(res.DISPLAY);
      });
  }

  handleData(data) {
    const raw = {};
    const out = [];
    const coins = this.props.getCoins();
    const currency = this.props.getCurrency();

    console.log(data, coins, currency);

    coins.forEach((coin) => {
      if (!data[coin]) return;

      raw[coin] = data[coin][currency];
      raw[coin].diff = Number(raw[coin].PRICE.replaceAll(/[^0-9.]/gi, '')) - Number(raw[coin].OPENDAY.replaceAll(/[^0-9.]/gi, ''));
      raw[coin].diff = raw[coin].diff.toFixed(4);
    });

    const sortedKeys = Object.keys(raw).sort(function(a,b){return raw[a].diff - raw[b].diff})
    sortedKeys.forEach(coin => out.push({coin, data: raw[coin]}));

    this.setState({ data: out, coins, currency });
  }

  render() {
    const currency = this.props.getCurrency();

    return (
      <Table stickyHeader  aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Coin Name</TableCell>
            <TableCell>Current Price ({currency})</TableCell>
            <TableCell>Opening price ({currency})</TableCell>
            <TableCell>Price Increase↓</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.data.map(out => {
          return (
          <TableRow key={out.coin}>
            <TableCell>{out.coin}</TableCell>
            <TableCell>{out.data.PRICE}</TableCell>
            <TableCell>{out.data.OPENDAY}</TableCell>
            <TableCell>{out.data.diff}</TableCell>
          </TableRow>
          )
        })}
        </TableBody>
      </Table>
    )
  }
}
