import React from 'react'
import moment from 'moment'

class MonthGrid extends React.Component {
  constructor(props) {
    super(props);
    
    let arr = []
    for(let i=-2; i <= 34; i++) {
      if(i===0) i++
      let date = i
      if(date<0) date = 31 + date + 1
      if(date>31) date = date - 31
      arr.push(` [${date}] `)
    }

    this.state = {
      currentMonth: {
        name: "January",
        date: 1,
        day: "Monday"
      },
      days: arr
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="">
        <header>{ this.state.currentMonth.name }</header>
        <ul>
          {this.state.days}
        </ul>
      </div>
    )
  }
}

export default MonthGrid;
