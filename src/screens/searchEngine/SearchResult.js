import React, { Component } from 'react';
import { ResultView } from './components/ResultView';
import { resetResults } from './Cortex';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    console.log('tkt searchResult');
    this.state = {
      loading: false,
    };
  }

  componentWillUnmount() {
    resetResults();
  }

  render() {
    return <ResultView navigation={this.props.navigation} />;
  }
}
