import React from 'react';
import { Route } from 'react-router-dom';

import moment from 'moment';
import MonthGrid from './monthgrid';
import NavBar from './navbar';
import Day from './day';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    // default, temp, calendar structure
    let arr = [];
    for(let i=-2; i <= 34; i++) {
      if(i===0) i++;
      let date = i;
      if(date<0) date = 31 + date + 1;
      if(date>31) date = date - 31;
      arr.push({ date:date, day:"Monday", overflow: true });
    }

    this.state = {
      date: {
        days: arr,
        current: {
          year: 1900,
          month: "January",
          date: 1,
          day: "Monday"
        }
      }
    };

    this.state.date = this.getDate();

    this.getDate = this.getDate.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
  }

  /*
    Gets the current year

    @returns string - current year in YYYY format
  */
  getCurrentYear() {
    return moment().format("YYYY");
  }

  /*
    Gets the current month

    @returns string - current year in MMMM format
  */
  getCurrentMonth() {
    return moment().format("MMMM");
  }

  /*
    Gets the params from the url

    @returns object - year and month
  */
  getUrlParams() {
    const months = "JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember";
    const minYear = 1950;
    const maxYear = 2049;

    // check if year param is defined
    // only need to check if a year exists (first part of url)
    if(this.props.match.params.year !== undefined) {
      try {
        // check if url month is a proper month
        if(!months.includes(this.props.match.params.month)) {
          throw "Unsupported month!";
        }

        // check if the url year is a number
        if(isNaN(parseInt(this.props.match.params.year))) {
          throw "Unsupported year!";
        } else {
          // check if year is in supported range
          if(parseInt(this.props.match.params.year) < 1950
             || parseInt(this.props.match.params.year) > 2049) {
            throw "Year out of supported range!";
          }
        }

        // get year from params, if available
        const urlYear = this.props.match.params.year ? this.props.match.params.year : this.getCurrentYear();

        // get month from params, if available
        const urlMonth = this.props.match.params.month ? this.props.match.params.month : this.getCurrentMonth();

        return { year: urlYear, month: urlMonth };
      } catch(err) {
        console.error(err);
      }
    }

    return { year: this.getCurrentYear(), month: this.getCurrentMonth() };
  }

  /*
    Gets the current days to display, including overflow before/after the current month

    @returns array - dates, including overflow
  */
  getCurrentDays(inYear, inMonth) {
    let dates = [];

    // set predays and post days for overflow
    let preDays = Math.floor((36-moment().year(inYear).month(inMonth).daysInMonth())/2);
    let postDays = Math.ceil((36-moment().year(inYear).month(inMonth).daysInMonth())/2);

    // postDays-(postDays-preDays) to fill out the final day(s)
    // in the case that preDays<postDays
    for(let i=-preDays; i<36-(postDays-(postDays-preDays)); i++) {
      // month starts on 1, 0 is previous month
      const theDate = moment().year(inYear).month(inMonth).date(i);
      const date = theDate.format("D");
      const day = theDate.format("dddd");
      // overflow if negative or over month limit
      const overflow = (i<=0 || i>moment().year(inYear).month(inMonth).daysInMonth());
      dates.push({ date:date, day: day, overflow: overflow });
    }

    return dates;
  }

  /*
    Gets an object with the details of the current date (year, month, date and day), including Day component array

    @returns object - date object for the current state
  */
  getDate() {
    let date = {
      current: {
        year: this.getUrlParams().year,
        month: this.getUrlParams().month,
        date: moment().format("D"),
        day: moment().format("dddd")
      }
    };

    // set the display days data
    date.days = this.getCurrentDays(this.getUrlParams().year, this.getUrlParams().month);

    // create DOM for the display days
    date.listDates = date.days.map((date, index) => {
      const diff = date.overflow ? "lighten-1" : "darken-1";
      const color = this.isCurrentDate(this.getUrlParams().year, this.getUrlParams().month, date.date) ? "deep-purple" : "blue-grey";
      const classes = `monthDay card ${color} ${diff} col s4 m2`;

      return (
        <Day 
          key={`${date.date}${date.day}${index}`}date={ date } 
          classes={ classes } />
      );
    });

    return date;
  }

  /*
    Checks whether the input date date is the current date

    @returns boolean - whether the input is the current date
  */
  isCurrentDate(year, month, date) {
    const today = moment().format();
    const checkDate = moment().year(year).month(month).date(date).format();

    return (today === checkDate);
  }


  /*
    Changes the current display place to the input month and returns a new url

    @returns string - new url with current year/month
  */
  changeMonth(month) {
    let currentYear = parseInt(this.getUrlParams().year);
    // get current month, format it to a number(string) and parse that to a number proper
    const monthNo = parseInt(moment().month(this.getUrlParams().month).format("M"));

    // check what kind of "month" we have, if prev/next or actual month
    if(month === "prev") {
      if(monthNo === 1) {
        if(currentYear === 1950) return "1950/January"
        currentYear--;
      }
      const prevMonth = moment().year(currentYear).month(monthNo-2).format("MMMM");

      return `${currentYear}/${prevMonth}`;
    } else
    if (month === "next") {
      if(monthNo === 12) {
        if(currentYear === 2049) return "2049/December"
        currentYear++;
      }
      const nextMonth = moment().year(currentYear).month(monthNo).format("MMMM");

      return `${currentYear}/${nextMonth}`;
    } else {
      return `${this.getUrlParams().year}/${month}`;
    }
  }

  /*
    Changes the current display place to the input year and returns a new url

    @returns string - new url with current year/month
  */
  changeYear(year) {
    const month = parseInt(moment().year(year).month(this.getUrlParams().month).format("M"));
    return `${year}/${month}`;
  }

  render() {
    let date = this.getDate();

    return (
      <div className="calendar">
        <NavBar year={ date.current.year } month={ date.current.month } changeMonth={ this.changeMonth } changeYear={ this.changeYear } />
        <MonthGrid date={ date } />
      </div>
    );
  }
}

export default Calendar;
