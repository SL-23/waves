import React, { Component } from 'react';
import Header from '../Components/Header_footer/Header';
import Footer from '../Components/Header_footer/Footer'

class Layout extends Component {

 
  render() {
    return (
      <div>
      	<Header />
        <div className='page_container'>
        	{this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout;