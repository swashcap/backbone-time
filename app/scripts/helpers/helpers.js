/* global define */
define(['underscore'], function(_) {
  'use strict';

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   * Format a date.
   *
   * This is a (nearly) complete implementation of Ruby's string time
   * formats.
   *
   * @link http://rubyinrails.com/2013/09/strftime-format-time-in-ruby/
   *
   * @todo Test this function.
   *
   * @param  num JavaScript epoch number
   * @param  str Desired return format
   * @return str Formatted date string
   */
  function formatDate(date, format) {
    if ( ! date) {
      date = new Date();
    } else if ( ! (date instanceof Date)) {
      date = new Date(date);
    }

    if (format === 'undefined') {
      // Default format (YYYY MM DD)
      format = '%Y %m %d';
    }

    var formatFunctions = {
      // Hour (24)
      '%H':
        function(date) {
          return date.getHours();
        },
      // Hour (12)
      '%I':
        function(date) {
          var hours = date.getHours();
          return (hours > 12) ? hours - 12 : hours;
        },
      '%M': // Minutes
        function(date) {
          return date.getMinutes();
        },
      '%S': // Seconds
        function(date) {
          return date.getSeconds();
        },
      '%Y': // Year
        function(date) {
          return date.getFullYear();
        },
      '%m': // Month
        function(date) {
          var month = date.getMonth();

          return (month.toString().length === 2) ? month : '0' + month;
        },
      '%d': // day
        function(date) {
          return date.getDate();
        },
      '%w': // Week day
        function(date) {
          return date.getDay();
        },
      '%a': // Week day name (short)
        function(date) {
          return DAYS_SHORT[date.getDay()];
        },
      '%A': // Week day name (full)
        function(date) {
          return DAYS[date.getDay()];
        },
      '%b': // Month name (short)
        function(date) {
          return MONTHS_SHORT[date.getMonth()];
        },
      '%B': // Month name (full)
        function(date) {
          return MONTHS[date.getMonth()];
        },
      '%y': // Year (without century)
        function(date) {
          return date.getFullYear().substr(2);
        },
      '%Z': // Time zone
        function(date) {
          /**
           * @todo Fix this to print a string
           */
          return date.getTimezoneOffset();
        },
      '%p': // AM/PM
        function(date) {
          var hours = date.getHours();
          return (hours > 11) ? 'PM' : 'AM';
        }
    };

    var regex = new RegExp('(' + _.keys(formatFunctions).join('|') + ')', 'g');

    var matches = format.match(regex);

    if (matches.length) {
      for (var i = 0; i < matches.length; i++) {
        format = format.replace(matches[i], formatFunctions[matches[i]](date));
      }

      return format;
    }
  }

  /**
   * Get a month name from its integer.
   *
   * @param  num
   * @return str
   */
  function getMonthName(month) {
    return MONTHS[month];
  }

  return {
    formatDate: formatDate,
    getMonthName: getMonthName
  };

});