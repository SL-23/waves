import React, { Component } from 'react';
import MyButton from './Button';
import { connect } from 'react-redux';
import { addToCartUser } from '../../actions/user_action';

class Card extends Component {
  rendCardImage(images)
  {
  	if(images.length > 0)
  	{
  		return images[0].url;
  	}
  	else
  	{
  		return '/images/image_not_available.png'
  	}
  }

  render() {
  	const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
      	<div 
      	 className='image'
      	 style={{
      	 	background:`url(${this.rendCardImage(props.images)}) no-repeat`
      	 }}
      	></div>


      	<div className='action_container'>
      			<div className='tags'>
      				<div className='brand'> {props.brand.name} </div>
      				<div className='name'> {props.name} </div>
      				<div className='name'> ${props.price} </div>
      			</div>
      	
          	{
          		props.grid ?
          			<div className='description'> 
                  <p>
                    {props.description}
                  </p>
                </div>
          		: null
          	}

          	<div className='actions'>
          		<div className='button_wrapp'>
          			<MyButton 
          				type='default'
          				altClass='card_link'
          				title='View product'
          				linkTo={`/product_detail/${props._id}`}
          				addStyles={{
          					margin: '10px 0 0 0'
          				}}
          			/>
          		</div>

          		<div className='button_wrapp'>
          			<MyButton 
          				type='bag_link'
          				runAction={() => {
                    props.user.userData.isAuth ?
                      this.props.dispatch(addToCartUser(props._id))
                    : console.log('need log in') 
                  }}
          				altClass='card_link'
          				title='View product'
          				linkTo={`/product_detail/${props._id}`}
          				addStyles={{
          					margin: '10px 0 0 0'
          				}}
          			/>
          		</div>
        	  </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Card);