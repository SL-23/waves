import React from 'react';

const ProductBlock = ({products, type, removeItem}) => {

	const renderCartImg = (images) => {
		if(images.length > 0) {
			console.log(images[0].url)
			return images[0].url
		}
		else {
			return '/images/image_not_available.png'
		}
	};

	const renderItems = () => (
		products.cartDetail ?
			products.cartDetail.map(products => (
				<div className='user_product_block' key={products._id}> 
					<div className='item'>
						<div
							className='image'
							style={{
					      	 	background:`url(${renderCartImg(products.images)}) no-repeat`
					      	 }}
						>
						</div>
					</div>
					<div className='item'>
						<h4>Product Name</h4>
						<div> {products.brand.name} {products.name} </div>
					</div>
					<div className='item'>
						<h4>Quantity</h4>
						<div> {products.quantity} </div>
					</div>
					<div className='item'>
						<h4>Price</h4>
						<div> ${products.price} </div>
					</div>
					<div className='item btn'>
						<div className='cart_remove_btn' 
							onClick={() => removeItem(products._id)}
						>
							Remove
						</div>

					</div>
				</div>

			))
		: null
	)
	
	return (
	    <div>
	      { renderItems() }
	    </div>

	)
}
export default ProductBlock;