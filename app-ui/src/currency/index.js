import React, { Component } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';

export default class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currencies: ['GBP', 'USD', 'EUR'],
    }
  }

  handleChange = (event) => {

    this.props.setCurrency(event.target.value);
  }

  render() {
    return (
      <FormControl style={{minWidth: '120px', padding: '5px'}}>
        <Select
          id="demo-simple-select"
          value={this.props.getCurrency()}
          onChange={this.handleChange}
        >
        {this.state.currencies.map((currency) => {
          return (
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          )
        })}
        </Select>
      </FormControl>
    )
  }
}
