/* global define */
define(['backbone'], function(Backbone) {
  'use strict';

  var Entry = Backbone.Model.extend({
    defaults: {
      date: 0,
      duration: 0
    }
  });

  return Entry;
});