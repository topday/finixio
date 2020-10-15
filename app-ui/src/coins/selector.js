import React, { Component } from 'react';
import { Paper, Chip } from '@material-ui/core';

const style = {
  root: {
    display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: '10px',
      margin: 0,
    },
    chip: {
      margin: '5px'
    }
  };

export default class Selector extends Component {

  handleDelete = (toDelete) => {
    const coins = this.props.getCoins().filter(coin => coin !== toDelete);
    this.props.setCoins(coins);
  }

  render() {
    return (
      <Paper component="ul" style={style.root}>
      {this.props.getCoins().map((coin) => {
        return (
          <li key={coin}>
            <Chip
              label={coin}
              onDelete={() => this.handleDelete(coin)}
              style={style.chip}
            />
          </li>
        )
      })}
      </Paper>
    )
  }
}
