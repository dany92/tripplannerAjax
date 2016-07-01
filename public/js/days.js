'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var daysModule = (function () {

  // application state
  var days = [],
      currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay () {
    if (this && this.blur) this.blur(); // removes focus box from buttons
     // dayModule
    //days.push(newDay);
    var numDays;
    getNumDays()
    .then(function(num){
      numDays = num;
    })
    .then(function(){
      console.log("days: "+numDays);
      $.post('/api/days',{ number: numDays + 1 })
      .then(function(newDay){
        console.log("did it gt here", newDay.day);
        dayModule.create({ number: newDay.day.number });
      })
      .catch(console.error.bind(console));

      if ((numDays + 1) === 1) {
        currentDay = newDay;
        switchTo(currentDay);
      }
    });
  }

  function getNumDays(){
    return $.get('/api/days') //gets all the days
    .then(function(days){
      console.log("NUM days", days.days.length);
      return days.days.length;
    })
    .catch(console.error.bind(console));
  }


  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    // fix the remaining day numbers
    days.forEach(function (day, i) {
      day.setNumber(i + 1);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  // globally accessible module methods

  var methods = {

    load: function () {
      $(addDay);
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return methods;

}());
