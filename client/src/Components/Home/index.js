import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardBlock from '../Utils/CardBlock'

import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySell } from '../../actions/products_action';

class Home extends Component {

  componentDidMount()
  {
    console.log(this.props.products);
  	this.props.dispatch(getProductsBySell());
  	this.props.dispatch(getProductsByArrival());
    console.log('here');
    console.log(this.props.products);
  	
  }


  render() {
    return (
      <div>
      	<HomePromotion/>
        <CardBlock 
          list={this.props.products.bySell}
          title='Best selling guitar'
        />
        <HomeSlider/>
        <CardBlock 
          list={this.props.products.byArrival}
          title='Lastest arrivals'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapStateToProps)(Home);