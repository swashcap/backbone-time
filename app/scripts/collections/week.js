/* global define */
define([
  'backbone',
  'models/day'
], function(Backbone, DayModel) {
  'use strict';

  var WeekCollection = Backbone.Collection.extend({
    model: DayModel
  });

  return WeekCollection;
});