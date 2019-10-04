import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchTextChanged = (event) => {
        const term = event.target.value;
        this.setState({ term });
        this.props.onSearchTextChangedApp(term);
    };

    render() {
        return (
            <input type="text"
               className="form-control search-input"
               placeholder="Type to search"
               onChange={ this.onSearchTextChanged }
               value={ this.state.term }/>
        );
    }
}
