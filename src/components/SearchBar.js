'use strict';
var isString = require('lodash').isString;
var React = require('react/addons');

var formatters = require('./formatters');
var predicates = require('./predicates');


module.exports = React.createClass({
    displayName: 'Search',

    propTypes: {
        columns: React.PropTypes.array,
        data: React.PropTypes.array,
        onChange: React.PropTypes.func,
        options: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            columns: [],
            data: [],
            options: {
                strategy: predicates.infix,
                transform: formatters.lowercase
            }
        };
    },

    getInitialState() {
        return {
            column: 'all',
            query: ''
        };
    },

    render() {
        var columns = this.props.columns;
        var options = [{
            value: 'all',
            name: 'All'
        }].concat(columns.map((column) => {
            if(column.property && column.header) {
                return {
                    value: column.property,
                    name: column.header
                };
            }
        }).filter(id));

        return (
          <input onChange={this.onQueryChange} value={this.state.query}></input>
        );
    },

    onColumnChange(event) {
        var column = event.target.value;
        var query = this.state.query;
        this.setState({
            column: column
        });

        this.callOnChange(column, query);
    },

    onQueryChange(event) {
        var column = this.state.column;
        var query = event.target.value;
        this.setState({
            query: query
        });

        this.callOnChange(column, query);
    },

    componentDidMount() {
        this.callOnChange(this.state.column, this.state.query);
    },

    callOnChange(column, query) {
        (this.props.onChange || noop)(
            {
                column: column,
                data: this.filterData(column, query),
                query: query
            }
        );
    },

    filterData(column, query) {
        var columns = this.props.columns;
        var data = this.props.data;

        if(!query) {
            return data;
        }

        if(column !== 'all') {
            columns = columns.filter((col) =>
                col.property === column
            );
        }

        return data.filter((row) =>
            columns.filter(isColumnVisible.bind(this, row)).length > 0
        );

        function isColumnVisible(row, col) {
            var property = col.property;
            var value = row[property];
            var formatter = col.search || formatters.identity;
            var formattedValue = formatter(value);

            if (!formattedValue) {
                return false;
            }

            if(!isString(formattedValue)) {
                formattedValue = formattedValue.toString();
            }

            var predicate = this.props.options.strategy(this.props.options.transform(query));

            return predicate.evaluate(this.props.options.transform(formattedValue));
        }
    },
    matches(column, value) {
        if (this.state.column !== 'all' && this.state.column !== column) {
            return [];
        }

        var predicate = this.props.options.strategy(this.props.options.transform(this.state.query));
        return predicate.matches(this.props.options.transform(value));
    }
});

function id(a) {
    return a;
}

function noop() {}
