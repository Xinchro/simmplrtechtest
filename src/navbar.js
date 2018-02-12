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
          <li><a href={ `#!/${this.props.year}/january` }>January</a></li>
          <li><a href={ `#!/${this.props.year}/february` }>February</a></li>
          <li><a href={ `#!/${this.props.year}/march` }>March</a></li>
        </ul>
        <ul id="yearDropdown" className="dropdown-content">
          <li><a href={ `#!/1900/${this.props.month}` }>1900</a></li>
          <li><a href={ `#!/1950/${this.props.month}` }>1950</a></li>
          <li><a href={ `#!/2000/${this.props.month}` }>2000</a></li>
        </ul>
        <section className="nav-wrapper">
          <ul className="right">
            <li>
              <a href={ `#!/${this.props.changeMonth("prev")}` }>
                <i className="material-icons left">chevron_left</i>
              </a>
            </li>
            <li>
              <a className="dropdown-button" href="#!" data-activates="monthDropdown">{ this.props.month }</a>
            </li>
            <li>
              <a href={ `#!/${this.props.changeMonth("next")}` }>
                <i className="material-icons right">chevron_right</i>
              </a>
            </li>
            <li>
              <a className="dropdown-button" href="#!" data-activates="yearDropdown">{ this.props.year }</a>
            </li>
          </ul>
        </section>
      </nav>
    )
  }
}

export default NavBar;


