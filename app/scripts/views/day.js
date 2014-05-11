/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/day.html',
  'collections/day',
  'views/entry'
], function($, _, Backbone, Template, Day, EntryView) {
  'use strict';

  var DayView = Backbone.View.extend({
    el: '#main',
    template: _.template(Template),

    initialize: function(entries) {
      // Construct the collection
      this.collection = new Day(entries);

      // Add the view's template to `el`
      this.$el.html(this.template(this.getViewJSON()));

      this.render();
    },

    render: function() {
      this.collection.each(function(entry) {
        this.renderEntry(entry);
      }, this);
    },

    renderEntry: function(entry) {
      var entryView = new EntryView({model: entry});

      this.$el.find('tbody').append(entryView.render().el);
    },

    getViewJSON: function() {
      var currentDate = this.collection.first().get('date');
      var nextDate = currentDate + 24 * 60 * 60 * 1000;
      var previousDate = currentDate - 24 * 60 * 60 * 1000;

      console.log(currentDate, nextDate, previousDate);

      return {};
    }
  });

  return DayView;
});