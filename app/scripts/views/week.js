/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/week.html',
  'collections/week',
  'views/day-single',
  'helpers/helpers'
], function(
  $,
  _,
  Backbone,
  WeekTemplate,
  Week,
  DayView,
  DateHelper
) {
  'use strict';

  var WeekView = Backbone.View.extend({
    el: '#main',
    template: _.template(WeekTemplate),

    initialize: function(days) {
      this.collection = new Week(days);

      /**
       * An arbitrary day's timestamp is stored in the view's
       * `currentWeek` property. It doesn't matter whether this day
       * is a Sunday, Thursday, etc. The view will figure it out.
       *
       * @type num
       */
      this.currentWeek = this.collection.first().get('date');

      this.render();
    },

    events: {
      'click .previous': 'weekNavigator',
      'click .current': 'weekNavigator',
      'click .next': 'weekNavigator'
    },

    renderDay: function(day) {
      var dayView = new DayView({model: day});
      this.$el.find('tbody').append(dayView.render().el);
    },

    render: function() {
      // Add the view's template to `el`
      this.$el.html(this.template(this.getViewJSON()));

      this.collection.each(function(day) {
        this.renderDay(day);
      }, this);
    },

    weekNavigator: function (e) {
      e.preventDefault();

      if ($(e.target).hasClass('previous')) {
        this.currentWeek -= 7 * 24 * 60 * 60 * 1000;
        this.render();
      } else if ($(e.target).hasClass('next')) {
        this.currentWeek += 7 * 24 * 60 * 60 * 1000;
        this.render();
      } else {
        var date = new Date();
        this.currentWeek = date.getTime();
        this.render();
      }
    },

    getViewJSON: function() {
      var firstDate = new Date(this.currentWeek); // <3

      var first = firstDate.getTime() - firstDate.getDay() * 24 * 60 * 60 * 1000;

      var last = firstDate.getTime() + (6 - firstDate.getDay()) * 24 * 60 * 60 * 1000;

      return {
        previous:
          DateHelper.formatDate(first - 7 * 24 * 60 * 60 * 1000, '%B %d') +
          DateHelper.formatDate(last - 7 * 24 * 60 * 60 * 1000, ' &ndash; %d'),
        current:
          DateHelper.formatDate(first, '%B %d') +
          DateHelper.formatDate(last, ' &ndash; %d'),
        next:
          DateHelper.formatDate(first + 7 * 24 * 60 * 60 * 1000, '%B %d') +
          DateHelper.formatDate(last + 7 * 24 * 60 * 60 * 1000, ' &ndash; %d'),
      };
    }
  });

  return WeekView;
});