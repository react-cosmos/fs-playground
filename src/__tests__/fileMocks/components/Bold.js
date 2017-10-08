import { Component } from 'react';

export default class Bold extends Component {
  render() {
    return <strong>{this.props.name}</strong>;
  }
}
