import React from 'react'
import { Route } from 'react-router-dom'

import moment from 'moment'
import MonthGrid from './monthgrid'
import NavBar from './navbar'
import Day from './day'

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    // default, temp, calendar structure
    let arr = []
    for(let i=-2; i <= 34; i++) {
      if(i===0) i++
      let date = i
      if(date<0) date = 31 + date + 1
      if(date>31) date = date - 31
      arr.push({ date:date, day:"Monday", overflow: true })
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
    }

    this.state.date.days = this.getCurrentDays(this.getUrlParams().year, this.getUrlParams().month)

    this.state.date.listDates = this.state.date.days.map((date, index) => {
      const diff = date.overflow ? "lighten-1" : "darken-1"
      const color = this.isCurrentDate(this.getUrlParams().year, this.getUrlParams().month, date.date) ? "deep-purple" : "blue-grey"
      const classes = `monthDay card ${color} ${diff} col s4 m2`

      return (
        <Day 
          key={`${date.date}${date.day}${index}`}date={ date } 
          classes={ classes } />
      )
    })

    this.getDate = this.getDate.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.changeYear = this.changeYear.bind(this)
  }

  getCurrentYear() {
    return moment().format("YYYY")
  }

  getCurrentMonth() {
    return moment().format("MMMM")
  }

  getUrlParams() {
    const months = "JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember"
    const minYear = 1950
    const maxYear = 2049

    try {
      if(!months.includes(this.props.match.params.month)) {
        throw "Unsupported month!"
      }

      if(isNaN(parseInt(this.props.match.params.year))) {
        throw "Unsupported year!"
      } else {
        if(parseInt(this.props.match.params.year) < 1950
           || parseInt(this.props.match.params.year) > 2049) {
          throw "Year out of supported range!"
        }
      }

      // get year from params, if available
      const urlYear = this.props.match.params.year ? this.props.match.params.year : this.getCurrentYear()

      // get month from params, if available
      const urlMonth = this.props.match.params.month ? this.props.match.params.month : this.getCurrentMonth()

      return { year: urlYear, month: urlMonth }
    } catch(err) {
      console.error(err)
    }

    return { year: this.getCurrentYear(), month: this.getCurrentMonth() }
  }

  getCurrentDays(inYear, inMonth) {
    let dates = []

    let preDays = Math.floor((36-moment().year(inYear).month(inMonth).daysInMonth())/2)
    let postDays = Math.ceil((36-moment().year(inYear).month(inMonth).daysInMonth())/2)

    // postDays-(postDays-preDays) to fill out the final day(s)
    // in the case that preDays<postDays
    for(let i=-preDays; i<36-(postDays-(postDays-preDays)); i++) {
      // month starts on 1, 0 is previous month
      const theDate = moment().year(inYear).month(inMonth).date(i)
      const date = theDate.format("D")
      const day = theDate.format("dddd")
      const overflow = (i<=0 || i>moment().year(inYear).month(inMonth).daysInMonth())
      dates.push({ date:date, day: day, overflow: overflow })
    }

    return dates
  }

  getDate() {
    let date = {
      current: {
        year: this.getUrlParams().year,
        month: this.getUrlParams().month,
        date: moment().format("D"),
        day: moment().format("dddd")
      }
    }

    date.days = this.getCurrentDays(this.getUrlParams().year, this.getUrlParams().month)

    date.listDates = date.days.map((date, index) => {
      const diff = date.overflow ? "lighten-1" : "darken-1"
      const color = this.isCurrentDate(this.getUrlParams().year, this.getUrlParams().month, date.date) ? "deep-purple" : "blue-grey"
      const classes = `monthDay card ${color} ${diff} col s4 m2`

      return (
        <Day 
          key={`${date.date}${date.day}${index}`}date={ date } 
          classes={ classes } />
      )
    })

    return date
  }

  isCurrentDate(year, month, date) {
    const today = moment().format()
    const checkDate = moment().year(year).month(month).date(date).format()

    return (today === checkDate)
  }

  changeMonth(month) {
    let currentYear = this.props.match.params.year ? this.props.match.params.year : moment().format("YYYY")
    const monthNo = this.props.match.params.month ? parseInt(moment().year(currentYear).month(this.props.match.params.month).format("M")) : moment().format("M")

    currentYear = parseInt(currentYear)

    if(month === "prev") {
      if(monthNo === 1) {
        if(currentYear === 1950) return "1950/January"
        currentYear--
      }
      const prevMonth = moment().year(currentYear).month(monthNo-2).format("MMMM")

      return `${currentYear}/${prevMonth}`
    } else
    if (month === "next") {
      if(monthNo === 12) {
        if(currentYear === 2049) return "2049/December"
        currentYear++
      }
      const nextMonth = moment().year(currentYear).month(monthNo).format("MMMM")

      return `${currentYear}/${nextMonth}`
    } else {
      return `${this.props.match.params.year}/${month}`
    }
  }

  changeYear(year) {
    return `${year}/${this.props.match.params.month ? parseInt(moment().month(this.props.match.params.month).format("M")) : moment().month()}`
  }

  render() {
    let date = this.getDate()

    return (
      <div className="calendar">
        <NavBar year={ date.current.year } month={ date.current.month } changeMonth={ this.changeMonth } changeYear={ this.changeYear } />
        <MonthGrid date={ date } />
      </div>
    )
  }
}

export default Calendar
