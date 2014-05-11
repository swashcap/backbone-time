/* global define */
define([
  'backbone',
  'text!templates/week.html',
  'collections/week',
  'views/day-single'
], function(
  Backbone,
  WeekTemplate,
  Week,
  DayView
) {
  'use strict';

  var WeekView = Backbone.View.extend({
    el: '#main',
    template: _.template(WeekTemplate),

    initialize: function(days) {
      this.collection = new Week(days);

      // Add the view's template to `el
      this.$el.append(this.template());

      this.render();
    },

    renderDay: function(day) {
      var dayView = new DayView({model: day});
      this.$el.find('tbody').append(dayView.render().el);
    },

    render: function() {
      this.collection.each(function(day) {
        this.renderDay(day);
      }, this);
    }
  });

  return WeekView;
});