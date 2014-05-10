/* global requirejs */
requirejs.config({
  baseUrl: '/scripts/',
  paths: {
    'jquery': '/bower_components/jquery/dist/jquery',
    'underscore': '/bower_components/underscore/underscore',
    'backbone': '/bower_components/backbone/backbone',
    'text': '/bower_components/requirejs-text/text'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
  }
});

require(['routers/router'], function(AppRouter) {
  'use strict';

  AppRouter.initialize();
});