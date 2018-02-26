import React from 'react'
import moment from 'moment'

class MonthGrid extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <ul className="monthGrid row col s12">
          { this.props.date.listDates }
        </ul>
      </div>
    )
  }
}

export default MonthGrid;
