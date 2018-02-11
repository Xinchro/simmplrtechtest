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
      arr.push(` [${date}] `)
    }

    this.state = {
      current: {
        month: "January",
        date: 1,
        day: "Monday"
      },
      days: arr
    }

    this.state.days = this.setCurrentDays()
    this.state.current.month = moment().format("MMMM")
    this.state.current.date = moment().format("D")
    this.state.current.day = moment().format("dddd")

    console.log(this.state.days)
  }

  setCurrentDays() {
    let dates = []

    const preDays = Math.floor((36-moment().daysInMonth())/2)
    const postDays = Math.ceil((36-moment().daysInMonth())/2)

    console.log(preDays, postDays)

    for(let i=-preDays; i<36-postDays; i++) {
      // +1 because moment is zero indexed, which "adds" 1 to preDays and "removes" to postDays
      let date = moment().date(i+1).format("D")
      dates.push(` [${date}] `)
    }

    return dates
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="">
        <header>{ this.state.current.month }, { this.state.current.date }, { this.state.current.day }</header>
        <ul className="monthGrid">
          <li className="monthDay">
            {this.state.days}
          </li>
        </ul>
      </div>
    )
  }
}

export default MonthGrid;
