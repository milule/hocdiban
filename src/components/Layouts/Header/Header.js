import React, { Component } from 'react';
import HeaderNav from './HeaderNav';

class Header extends Component {
  render() {
    return (
      <header id="header" className="transparent-nav">
          <HeaderNav />
      </header>
    );
  }
}

export default Header;
