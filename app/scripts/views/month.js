/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/month.html',
  'helpers/helpers'
], function($, _, Backbone, MonthTemplate, Helpers) {
  'use strict';

  var MonthView = Backbone.View.extend({
    el: '#main',
    template: _.template(MonthTemplate),

    /**
     * Initialize the view.
     *
     * @param  obj  Requested date
     * @param  obj  Current date
     * @return void
     */
    initialize: function(requestDate, currentDate) {
      this.requestDate = requestDate;

      if (currentDate) {
        this.currentDate = currentDate;
      } else {
        /**
         * @todo Client dates aren't trustworthy. Call to server.
         */
        this.currentDate = new Date();
      }

      this.render();
    },

    events: {
      // Navigate between months
      'click .next': 'monthNavigator',
      'click .previous': 'monthNavigator',
      'click .current': 'monthNavigator',

      'click tbody a': 'dayNavigator'
    },

    /**
     * Render the view.
     *
     * @return void
     */
    render: function() {
      var currentMonth = this.requestDate.getMonth();

      var previousMonth = (currentMonth - 1 >= 0) ? currentMonth - 1 : 11;

      var nextMonth = (currentMonth + 1 <= 11) ? currentMonth + 1 : 0;

      // Add template to the DOM
      this.$el.html(this.template({
        previous: Helpers.getMonthName(previousMonth),
        current: Helpers.getMonthName(currentMonth) + ' <small>' + this.requestDate.getFullYear() + '</small>',
        next: Helpers.getMonthName(nextMonth)
      }));

      var html = this.getHTML(this.requestDate);

      this.$el.find('tbody').html(html);
    },

    /**
     * Handle month change navigation.
     *
     * @param  obj Event
     * @return void
     */
    monthNavigator: function(e) {
      e.preventDefault();

      console.log('monthNavigator() fired.');

      if ($(e.target).hasClass('previous')) {
        this.requestDate = this.getPreviousMonthDate();
        this.render();
      } else if ($(e.target).hasClass('next')) {
        this.requestDate = this.getNextMonthDate();
        this.render();
      } else if ($(e.target).hasClass('current')) {
        if (this.requestDate !== this.currentDate) {
          this.requestDate = this.currentDate;
          this.render();
        }
      }
    },

    /**
     * @param  obj Event
     * @return void
     */
    dayNavigator: function(e) {
      e.preventDefault();
    },

    /**
     * Get the view's HTML.
     *
     * @todo Refactor, possibly split out into helper.
     *
     * @return str View's markup
     */
    getHTML: function() {
      // Store days in an array, iterate over it to build output html
      var days = [];

      var html = '';

      var daysPerMonth = this.getDaysPerMonth(this.requestDate);

      var firstDate = new Date(this.requestDate.getTime() - (this.requestDate.getDate() - 1) * 24 * 60 * 60 * 1000);

      var lastDate = new Date(this.requestDate.getTime() + (daysPerMonth - this.requestDate.getDate()) * 24 * 60 * 60 * 1000);

      // Pad array for month's first week
      days = _(firstDate.getDay()).times(function() { return ''; });

      for (var i = 1; i <= daysPerMonth; i++) {
        days.push(i);
      }

      days = days.concat(_(6 - lastDate.getDay()).times(function() { return ''; }));

      // Build HTML
      for (var i = 0; i < days.length; i++) {
        if (i % 7 === 0) {
          html += '<tr>';
        }
        html += '<td>';
        if (days[i]) {
          html += '<a href="/' + this.requestDate.getFullYear() + '/' + this.requestDate.getMonth() + '/' + days[i] + '">';
          if (days[i] === this.currentDate.getDate()) {
            html += '<strong>' + days[i] + '</strong>';
          } else {
            html += days[i];
          }
          html += '<a>';
        }
        html += '</td>';
        if ((i + 1) %76 === 0) {
          html += '</tr>';
        }
      }

      return html;
    },

    /**
     * Get the number of days for a given month.
     *
     * @param  obj JS Date() object
     * @return num
     */
    getDaysPerMonth: function(date) {
      var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      // Change February's day count for leap years
      if (date.getFullYear() % 4 === 0) {
        daysPerMonth[1] = 29;
      }

      return daysPerMonth[date.getMonth()];
    },

    /**
     * @return obj
     */
    getPreviousMonthDate: function() {
      var daysPerMonth = this.getDaysPerMonth(this.requestDate);

      var newRequestDate = this.requestDate.getTime() - daysPerMonth * 24 * 60 * 60 * 1000;

      return new Date(newRequestDate);
    },

    /**
     * @return obj
     */
    getNextMonthDate: function() {
      var daysPerMonth = this.getDaysPerMonth(this.requestDate);

      var newRequestDate = this.requestDate.getTime() + daysPerMonth * 24 * 60 * 60 * 1000;

      return new Date(newRequestDate);
    }
  });

  return MonthView;
});