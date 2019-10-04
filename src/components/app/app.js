import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoListItemAddForm from '../todo-list-item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' //all, active, done
    };

    createTodoItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.maxId++
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            // [a, b, c, d, e] - before deletion
            // [a, b,    d, e] - after concatenation
            // slice create new array, It is important not to change existing state, but to replace state object with new one!
            const newTodoData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newTodoData
            };
        });
    };

    addItem = (value) => {
        const newItem = this.createTodoItem(value);

        this.setState(({ todoData }) => {
            const newTodoData = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newTodoData
            };
        });
    };

    toggleProperty(array, id, propertyName) {
        const idx = array.findIndex((el) => el.id === id);

        const oldItem = array[idx];
        const newItem = { ...oldItem, [propertyName]: !oldItem[propertyName] };

        return [
            ...array.slice(0, idx),
            newItem,
            ...array.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onFilterChanged = (filter) => {
        this.setState({ filter });
    };

    onSearchTextChangedApp = (term) => {
        this.setState({ term });
    };

    searchItems(items, term) {
        if (term === '') {
            return items;
        }

        return items.filter((el) => el.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    filterItems(items, filter) {
        switch(filter) {
            case 'active':
               return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;

        const doneItems = todoData.filter((el) => el.done).length;
        const todoItems = todoData.length - doneItems;

        const visibleItems = this.filterItems(this.searchItems(todoData, term), filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoItems} done={doneItems} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchTextChangedApp={ this.onSearchTextChangedApp }/>
                    <ItemStatusFilter onFilterChanged={ this.onFilterChanged } filter={ filter }/>
                </div>

                <TodoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />

                <TodoListItemAddForm onItemAdded={ this.addItem }/>
            </div>
        );
    };
}
