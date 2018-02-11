import React from 'react'
import moment from 'moment'

class MonthGrid extends React.Component {
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
      current: {
        month: 1900,
        month: "January",
        date: 1,
        day: "Monday"
      },
      days: arr
    }

    this.state.days = this.setCurrentDays()
    this.state.current.year = moment().format("YYYY")
    this.state.current.month = moment().format("MMMM")
    this.state.current.date = moment().format("D")
    this.state.current.day = moment().format("dddd")

    this.state.listDates = this.state.days.map((date, index) => {
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

  setCurrentDays() {
    let dates = []

    const preDays = Math.floor((36-moment().daysInMonth())/2)
    const postDays = Math.ceil((36-moment().daysInMonth())/2)

    console.log(preDays, postDays)

    for(let i=-preDays; i<36-postDays; i++) {
      // +1 because moment is zero indexed, which "adds" 1 to preDays and "removes" to postDays
      const date = moment().date(i+1).format("D")
      const day = moment().date(i+1).format("dddd")
      const overflow = (i<0 || i>=moment().daysInMonth())
      dates.push({ date:date, day: day, overflow: overflow })
    }

    return dates
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="container">
        <header className="row">{ this.state.current.year }, { this.state.current.month }, { this.state.current.date }, { this.state.current.day }</header>
        <ul className="monthGrid row col s12">
          { this.state.listDates }
        </ul>
      </div>
    )
  }
}

export default MonthGrid;
