import React, { Component } from 'react';

import './todo-list-item-add-form.css';

export default class TodoListItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChanged = (event) => {
        this.setState({
            label: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="todo-list-item-add-form d-flex" onSubmit={ this.onSubmit }>
                <input type="text" className="form-control"
                       placeholder="What needs to be done"
                       onChange={ this.onLabelChanged }
                       value={this.state.label} />
                <button className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        );
    };
}
