import React from 'react'

import moment from 'moment'
import MonthGrid from './monthgrid'

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
        <li
          key={`${date.date}${date.day}${index}`}
          className={ classes }
          >
          <section className="card-content white-text">
            <p className="card-title">{ date.date }</p>
            <p>{ date.day }</p>
          </section>
        </li>
      )
    })
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

  render() {
    return (
      <div className="calendar">
        <ul id="monthDropdown" className="dropdown-content">
          <li><a href="#!">Jan</a></li>
          <li><a href="#!">Feb</a></li>
          <li><a href="#!">Mar</a></li>
        </ul>
        <ul id="yearDropdown" className="dropdown-content">
          <li><a href="#!">1900</a></li>
          <li><a href="#!">1950</a></li>
          <li><a href="#!">2000</a></li>
        </ul>
        <nav>
          <div class="nav-wrapper">
            <ul class="right hide-on-med-and-down">
              <li>
                <a href="#!">
                  <i className="fa fa-chevron-left"></i>
                </a>
              </li>
              <li>
                <a className="dropdown-button" href="#!" data-activates="monthDropdown">{ this.state.date.current.month }</a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a className="dropdown-button" href="#!" data-activates="yearDropdown">{ this.state.date.current.year }</a>
              </li>
            </ul>
          </div>
        </nav>
        <MonthGrid date={ this.state.date } />
      </div>
    )
  }
}

export default Calendar
