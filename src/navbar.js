import React from 'react'
import { Link } from 'react-router-dom'

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
          <li><Link to={ `/${this.props.changeMonth("january")}` }>January</Link></li>
          <li><Link to={ `/${this.props.year}/february` }>February</Link></li>
          <li><Link to={ `/${this.props.year}/march` }>March</Link></li>
        </ul>
        <ul id="yearDropdown" className="dropdown-content">
          <li><Link to={ `/1900/${this.props.month}` }>1900</Link></li>
          <li><Link to={ `/1950/${this.props.month}` }>1950</Link></li>
          <li><Link to={ `/2000/${this.props.month}` }>2000</Link></li>
        </ul>
        <section className="nav-wrapper">
          <ul className="right">
            <li>
              <Link to={ `/${this.props.changeMonth("prev")}` }>
                <i className="material-icons left">chevron_left</i>
              </Link>
            </li>
            <li>
              <Link to="/" className="dropdown-button" data-activates="monthDropdown">{ this.props.month }</Link>
            </li>
            <li>
              <Link to={ `/${this.props.changeMonth("next")}` }>
                <i className="material-icons right">chevron_right</i>
              </Link>
            </li>
            <li>
              <Link to="/" className="dropdown-button" data-activates="yearDropdown">{ this.props.year }</Link>
            </li>
          </ul>
        </section>
      </nav>
    )
  }
}

export default NavBar;


