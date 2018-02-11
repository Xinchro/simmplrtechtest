import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="calendar">
        <button className="waves-effect waves-light btn">button1</button>
      </div>
    );
  }
}

export default Calendar;
