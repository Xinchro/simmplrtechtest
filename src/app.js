import React from 'react'

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

    this.state.date.days = this.setCurrentDays()
    this.state.date.current.year = moment().format("YYYY")
    this.state.date.current.month = moment().format("MMMM")
    this.state.date.current.date = moment().format("D")
    this.state.date.current.day = moment().format("dddd")

    this.state.date.listDates = this.state.date.days.map((date, index) => {
      const diff = date.overflow ? "lighten-1" : "darken-1"
      const classes = `monthDay card blue-grey ${diff} col s4 m2`

      return (
        <Day date={ date } index={ index } classes={ classes } />
      )
    })

    this.changeMonth = this.changeMonth.bind(this)
    this.changeYear = this.changeYear.bind(this)
  }

  componentWillMount() {
  }

  setCurrentDays() {
    let dates = []

    const preDays = Math.floor((36-moment().daysInMonth())/2)
    const postDays = Math.ceil((36-moment().daysInMonth())/2)

    for(let i=-preDays; i<36-postDays; i++) {
      // +1 because moment is zero indexed, which "adds" 1 to preDays and "removes" to postDays
      const date = moment().date(i+1).format("D")
      const day = moment().date(i+1).format("dddd")
      const overflow = (i<0 || i>=moment().daysInMonth())
      dates.push({ date:date, day: day, overflow: overflow })
    }

    return dates
  }

  changeMonth(month) {
    if(month === "prev") {
      console.log("previous month")
      return `${this.state.date.current.year}/january`
    } else
    if (month === "next") {
      console.log("next month")
      return `${this.state.date.current.year}/march`
    } else {
      console.log(`chosen month: ${month}`)
      return `${this.state.date.current.year}/february`
    }
  }

  changeYear(year) {
    console.log(`chosen year: ${month}`)
    return `1900/${this.state.date.current.month}`
  }

  render() {
    return (
      <div className="calendar">
        <NavBar year={ this.state.date.current.year } month={ this.state.date.current.month } changeMonth={ this.changeMonth } changeYear={ this.changeYear } />
        <MonthGrid date={ this.state.date } />
      </div>
    )
  }
}

export default Calendar
