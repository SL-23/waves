import React, { Component } from 'react';
import Header from '../Components/Header_footer/Header';
import Footer from '../Components/Header_footer/Footer';

import { connect } from 'react-redux';
import { getSiteInfo } from '../actions/site_action';

class Layout extends Component {

  componentDidMount() {
    if(Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteInfo());
    }
  }
 
  render() {
    return (
      <div>
      	<Header />
        <div className='page_container'>
        	{this.props.children}
        </div>
        <Footer data={this.props.site}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(Layout);