import React, { Component } from 'react';
import PageTop from '../Utils/PageTop';

import { connect } from 'react-redux';
import { getProductDetails, clearProductDetails } from '../../actions/products_action';
import { addToCartUser } from '../../actions/user_action';

import ProdInfo from './ProdInfo';
import ProdImg from './ProdImg';

class Product extends Component {

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.dispatch(getProductDetails(id)).then(response => {
			if(!this.props.products.prodDetail)
			{
				this.props.history.push('/')
			}
		});
		
	}

	componentWillUnmount() {
		this.props.dispatch(clearProductDetails());
	}

	addToCartHandler = (id) => {
		this.props.dispatch(addToCartUser(id));
	}

	render() {
		return (
    		<div>
    			<PageTop 
    				title='Product Details'
    			/>
    			<div className='container'>
    				{
    					this.props.products.prodDetail ?
    					<div className='product_detail_wrapper'>
    						<div className='left'>
    							<div style={{ width: '500px'}} >
    								<ProdImg detail={this.props.products.prodDetail} />
    							</div>
    						</div>
    						<div className='right'>
    							<ProdInfo 
    								detail={this.props.products.prodDetail}
    								addToCart={ (id) => this.addToCartHandler(id) }
    							/>
    						</div>
    					</div>
    					: 'loading...'
    				}
    			</div>
      		</div>
    	)
  	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapStateToProps)(Product)