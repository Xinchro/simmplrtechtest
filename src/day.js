import React from 'react'

class Day extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <li
        key={`${this.props.date.date}${this.props.date.day}${this.props.index}`}
        className={ this.props.classes }
        >
        <section className="card-content white-text">
          <p className="card-title">{ this.props.date.date }</p>
          <p>{ this.props.date.day }</p>
        </section>
      </li>
    )
  }
}

export default Day;
