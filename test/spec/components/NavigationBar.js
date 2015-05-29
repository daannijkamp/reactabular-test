'use strict';

describe('NavigationBar', function () {
  var React = require('react/addons');
  var NavigationBar, component;

  beforeEach(function () {
    NavigationBar = require('components/NavigationBar.js');
    component = React.createElement(NavigationBar);
  });

  it('should create a new instance of NavigationBar', function () {
    expect(component).toBeDefined();
  });
});
