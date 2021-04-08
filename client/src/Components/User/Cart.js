import React, { Component } from 'react';
import UserLayout from '../../hoc/UserLayout';
import ProductBlock from '../Utils/User/ProductBlock';
import Paypal from '../Utils/Paypal';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_action';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

class Cart extends Component {

	state = {
		loading: true,
		total: 0,
		showTotal: false,
		showSuccess: false
	}

	calculateTotal = (cartDetail) => {
		let total = 0;
		cartDetail.forEach(item => {
			total += parseInt(item.price, 10) * item.quantity;
		})

		this.setState({
			total,
			showTotal: true
		})
	}
  	
  	componentDidMount() {
  		let cartItem = [];
  		let user = this.props.user;

  		if(user.userData.cart) 
  		{
  			if(user.userData.cart.length > 0)
  			{
  				user.userData.cart.forEach(item => {
  					cartItem.push(item.id)
  				});

  				this.props.dispatch(getCartItems(cartItem, user.userData.cart))
  				.then(() => {
  					if(this.props.user.cartDetail.length > 0)
  					{
  						this.calculateTotal(this.props.user.cartDetail);
  					}
  				})
  				
  			}
  		}



  	}

  	removeFromCart = (id) => {
  		this.props.dispatch(removeCartItem(id))
  			.then(() => {
  				if(this.props.user.cartDetail.length <= 0)
  				{
  					this.setState({
  						showTotal: false
  					})
  				} else {
  					this.calculateTotal(this.props.user.cartDetail)
  				}
  			})
  	}

  	showNoItemMessage = () => (
  		<div className='cart_no_item'>
  			<FontAwesomeIcon icon={faFrown}/>
  			You have no item
  		</div>
  	)

  	transactionError = (data) => {
      console.log(data);
  	}


  	transactionCancel = (data) => {
      console.log(data);
  	}

  	transactionSuccess = (data) => {
      console.log(data)
      this.props.dispatch(onSuccessBuy({
        cartDetail: this.props.user.cartDetail,
        paymentData: data
      })).then(() => {
        if(this.props.user.SuccessBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          })
        }
      })
  	}
  	
  	render() {
    	return (
      		<div>
      			<UserLayout>
        			<div>
        				<h1>My Cart</h1>
        				<ProductBlock 
        					products={this.props.user}
        					type='cart'
        					removeItem={(id) => this.removeFromCart(id)}
        				/>
        			</div>
        			{
        				this.state.showTotal ?
        				<div className='user_cart_sum'>
        					<div>
        						Total amount:  ${this.state.total}
        					</div>
        				</div>
        				: 
        					this.state.showSuccess ?
        						<div className='cart_success'>
        							<FontAwesomeIcon icon={faSmile}/>
        							<div>Thank you</div>
        							<div>You order is now complete</div>
        						</div>	
        					: this.showNoItemMessage()
        			}

        			<div>
        				{
        					this.state.showTotal ? 
        						<div className='paypal_button_container'>
        							{<Paypal 
        							   toPay={this.state.total}
        							   transactionError={(data) => this.transactionError(data)}
        							   transactionCancel={(data) => this.transactionCancel(data)}
        							   onSuccess={(data) => this.transactionSuccess(data)}
        							 />}
        						</div>
        					: null
        				}
        			</div>
        		</UserLayout>
        		
      		</div>
    	)
  	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Cart);