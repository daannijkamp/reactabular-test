'use strict';

describe('DashboardApp', function () {
  var React = require('react/addons');
  var DashboardApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    DashboardApp = require('components/DashboardApp.js');
    component = React.createElement(DashboardApp);
  });

  it('should create a new instance of DashboardApp', function () {
    expect(component).toBeDefined();
  });
});
