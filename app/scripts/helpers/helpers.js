/* global define */
define(function() {
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /**
   * Format a date.
   *
   * @todo Add custom format functionality
   *
   * @param  num JavaScript epoch number
   * @param  str Desired return format
   * @return str Formatted date string
   */
  function formatDate(dateNumber, format) {
    var date = new Date(dateNumber);

    return DAYS[date.getDay()] + ' ' + ' ' + MONTHS[date.getMonth()] + ' ' + date.getDate();
  };

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