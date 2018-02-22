import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    let navLinks = []

    for(let i=0;i<100;i++) {
      let year = 1950+i
      navLinks.push(<li key={ `year-${year}` }><Link to={ `/${year}/${this.props.month}` }>{ year }</Link></li>)
    }

    return (
      <nav>
        <ul id="monthDropdown" className="dropdown-content">
          <li><Link to={ `/${this.props.changeMonth("january")}` }>January</Link></li>
          <li><Link to={ `/${this.props.changeMonth("february")}` }>February</Link></li>
          <li><Link to={ `/${this.props.changeMonth("march")}` }>March</Link></li>
          <li><Link to={ `/${this.props.changeMonth("april")}` }>April</Link></li>
          <li><Link to={ `/${this.props.changeMonth("may")}` }>May</Link></li>
          <li><Link to={ `/${this.props.changeMonth("june")}` }>June</Link></li>
          <li><Link to={ `/${this.props.changeMonth("july")}` }>July</Link></li>
          <li><Link to={ `/${this.props.changeMonth("august")}` }>August</Link></li>
          <li><Link to={ `/${this.props.changeMonth("september")}` }>September</Link></li>
          <li><Link to={ `/${this.props.changeMonth("october")}` }>October</Link></li>
          <li><Link to={ `/${this.props.changeMonth("november")}` }>November</Link></li>
          <li><Link to={ `/${this.props.changeMonth("december")}` }>December</Link></li>
        </ul>
        <ul id="yearDropdown" className="dropdown-content">
          { navLinks }
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


