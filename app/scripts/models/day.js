/* global define */
define([
  'backbone'
], function(Backbone) {
  'use strict'

  var DayModel = Backbone.Model.extend({
    defaults: {
      date: 0,
      duration: 0
    }
  });

  return DayModel;
});