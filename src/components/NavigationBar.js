'use strict';

var React = require('react/addons');


var NavigationBar = React.createClass({
  render: function () {
    return (
        <div style={{backgroundColor: 'blue'}}>
          <p>Content for NavigationBar</p>
          {this.props.children}
        </div>
      );
  }
});

module.exports = NavigationBar;
