'use strict';

var React = require('react/addons');
var Table = require('reactabular').Table;
var search = require('reactabular').Search.search;

var NavigationBar = require('./NavigationBar');
var SearchBar = require('./SearchBar');

// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

var data = [
  {
    name: 'React.js',
    type: 'library',
    description: 'Awesome library for handling view.',
    followers: 23252,
    worksWithReactabular: true,
  },
  {
    name: 'Angular.js',
    type: 'framework',
    description: 'Swiss-knife of frameworks. Kitchen sink not included.',
    followers: 35159,
    worksWithReactabular: false,
  },
  {
    name: 'Aurelia',
    type: 'framework',
    description: 'Framework for the next generation.',
    followers: 229,
    worksWithReactabular: false,
  },
];

var columns = [
  {
    property: 'name',
    header: 'Name',
  },
  {
    property: 'type',
    header: 'Type',
  },
  {
    property: 'description',
    header: 'Description',
  },
  {
    property: 'followers',
    header: 'Followers',
    // accuracy per hundred is enough for demoing
    cell: (followers) => followers - (followers % 100),
    // search targets values by default. we can customize
    // it by providing a custom data formatter to it to get
    // matches you might expect
    search: (followers) => followers - (followers % 100),
  },
  {
    property: 'worksWithReactabular',
    header: '1st Class Reactabular',
    // render utf ok if works
    cell: (works) => works && <span>&#10003;</span>,
  },
];

var DashboardApp = React.createClass({
  getInitialState() {
    return {
      data: data,
      columns: columns,
      search: {
        query: '',
        column: '',
      },
    };
  },
  render: function() {
    var searchData = search(
      this.state.search,
      this.state.columns,
      this.state.data
    );
    console.log(this.state.data);
    return (
      <div>
        <NavigationBar>
          <SearchBar columns={columns} onChange={this.setState.bind(this)}></SearchBar>
        </NavigationBar>
        <Table columns={columns} data={searchData} />
      </div>
    );
  }
});
React.render(<DashboardApp />, document.getElementById('content')); // jshint ignore:line

module.exports = DashboardApp;
