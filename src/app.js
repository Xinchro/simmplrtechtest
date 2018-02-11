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
        <button className="waves-effect waves-light btn">
          <i className="fa fa-chevron-left"></i>
        </button>

        <button className="waves-effect waves-light btn">
          <i className="fa fa-chevron-right"></i>
        </button>
        <MonthGrid />
      </div>
    )
  }
}

export default Calendar
