import React, { Component } from 'react';
import { Table, TableCell, TableBody, TableRow } from '@material-ui/core';
import Selector from './selector';
import Source from './source';

export default class Index extends Component {

  render() {
    return (
      <Table stickyHeader  aria-label="sticky table">
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}><Selector {...this.props} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Available Coins</TableCell>
            <TableCell><Source {...this.props} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

}

