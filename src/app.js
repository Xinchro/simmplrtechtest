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

    // get year from params, if available
    this.state.date.current.year = props.match.params.year ? props.match.params.year : moment().format("YYYY")
    // get month from params, if available
    this.state.date.current.month = props.match.params.month ? props.match.params.month : moment().format("MMMM")

    this.state.date.current.date = moment().format("D")
    this.state.date.current.day = moment().format("dddd")
    this.state.date.days = this.setCurrentDays(props.match.params.month ? props.match.params.month : moment().format("MMMM"))


    this.state.date.listDates = this.state.date.days.map((date, index) => {
      const diff = date.overflow ? "lighten-1" : "darken-1"
      const classes = `monthDay card blue-grey ${diff} col s4 m2`

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

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  setCurrentDays(inMonth) {
    let dates = []

    const month = moment().month(inMonth)

    let preDays = Math.floor((36-moment().month(inMonth).daysInMonth())/2)
    let postDays = Math.ceil((36-moment().month(inMonth).daysInMonth())/2)

    // postDays-(postDays-preDays) to fill out the final day(s)
    // in the case that preDays<postDays
    for(let i=-preDays; i<36-(postDays-(postDays-preDays)); i++) {
      // month starts on 1, 0 is previous month
      const theDate = moment().month(inMonth).date(i)
      const date = theDate.format("D")
      const day = theDate.format("dddd")
      const overflow = (i<=0 || i>moment().month(inMonth).daysInMonth())
      dates.push({ date:date, day: day, overflow: overflow })
    }

    return dates
  }

  getDate() {
    let date = {
      current: {
        year: this.props.match.params.year ? this.props.match.params.year : moment().format("YYYY"),
        month: this.props.match.params.month ? this.props.match.params.month : moment().format("MMMM"),
        date: moment().format("D"),
        day: moment().format("dddd")
      }
    }

    date.days = this.setCurrentDays(this.props.match.params.month ? this.props.match.params.month : moment().format("MMMM"))

    date.listDates = date.days.map((date, index) => {
      const diff = date.overflow ? "lighten-1" : "darken-1"
      const classes = `monthDay card blue-grey ${diff} col s4 m2`

      return (
        <Day 
          key={`${date.date}${date.day}${index}`}date={ date } 
          classes={ classes } />
      )
    })

    return date
  }

  changeMonth(month) {
    if(month === "prev") {
      const monthNo = this.props.match.params.month ? parseInt(moment().month(this.props.match.params.month).format("M")) : moment().format("M")
      const prevMonth = moment().month(monthNo-2).format("MMMM")
      return `${this.state.date.current.year}/${prevMonth}`
    } else
    if (month === "next") {
      const monthNo = this.props.match.params.month ? parseInt(moment().month(this.props.match.params.month).format("M")) : moment().format("M")
      const nextMonth = moment().month(monthNo).format("MMMM")
      return `${this.state.date.current.year}/${nextMonth}`
    } else {
      return `${this.state.date.current.year}/${month}`
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
