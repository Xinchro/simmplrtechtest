import React from 'react'

import MonthGrid from './monthgrid'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="calendar">
        <button className="waves-effect waves-light btn">button1</button>
        <MonthGrid />
      </div>
    )
  }
}

export default Calendar
