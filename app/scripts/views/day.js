/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/day.html',
  'collections/day',
  'views/entry',
  'helpers/helpers'
], function($, _, Backbone, Template, Day, EntryView, DateHelper) {
  'use strict';

  var DayView = Backbone.View.extend({
    el: '#main',
    template: _.template(Template),

    initialize: function(entries) {
      // Construct the collection
      this.collection = new Day(entries);

      this.render();
    },

    render: function() {
      // Add the view's template to `el`
      this.$el.html(this.template(this.getViewJSON()));

      this.collection.each(function(entry) {
        this.renderEntry(entry);
      }, this);
    },

    renderEntry: function(entry) {
      var entryView = new EntryView({model: entry});

      this.$el.find('tbody').append(entryView.render().el);
    },

    getViewJSON: function() {
      var current = this.collection.first().get('date');
      var next = current + 24 * 60 * 60 * 1000;
      var previous = current - 24 * 60 * 60 * 1000;

      return {
        current: DateHelper.formatDate(current, '%A <small>%B %d</small>'),
        next: DateHelper.formatDate(next, '%B %d'),
        previous: DateHelper.formatDate(previous, '%B %d')
      };
    }
  });

  return DayView;
});