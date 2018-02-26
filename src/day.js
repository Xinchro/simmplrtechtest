import React from "react";

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        className={ this.props.classes }
      >
        <section className="card-content white-text">
          <p className="card-title">{ this.props.date.date }</p>
          <p>{ this.props.date.day }</p>
        </section>
      </li>
    );
  }
}

export default Day;
