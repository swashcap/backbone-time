/* global define */
define(['backbone', 'models/entry'], function(Backbone, Entry) {
  'use strict';

  var Day = Backbone.Collection.extend({
    model: Entry
  });

  return Day;
});