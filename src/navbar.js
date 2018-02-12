import React from 'react'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <nav>
        <ul id="monthDropdown" className="dropdown-content">
          <li><a href="#!">Jan</a></li>
          <li><a href="#!">Feb</a></li>
          <li><a href="#!">Feb</a></li>
          <li><a href="#!">Mar</a></li>
        </ul>
        <ul id="yearDropdown" className="dropdown-content">
          <li><a href="#!">1900</a></li>
          <li><a href="#!">1950</a></li>
          <li><a href="#!">2000</a></li>
        </ul>
        <div class="nav-wrapper">
          <ul class="right hide-on-med-and-down">
            <li>
              <a href="#!">
                <i className="fa fa-chevron-left"></i>
              </a>
            </li>
            <li>
              <a className="dropdown-button" href="#!" data-activates="monthDropdown">{ this.props.month }</a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a className="dropdown-button" href="#!" data-activates="yearDropdown">{ this.props.year }</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;


