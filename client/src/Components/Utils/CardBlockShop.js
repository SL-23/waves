import React from 'react';
import Card from './Card'

const CardBlockShop = (props) => {

	const renderCards = () => (
		props.list ? 
			props.list.map((card, i) => (
				<Card 
					key={card._id}
					{...card}
					grid={props.grid}
				/>
			))
			: null
	)

	return (
    <div className='card_block_shop'>
      <div>
      	<div>
      		{
      			props.list ?
      			null
      			: 
      			<div className='no_result'>
      				Sorry, no results
      			</div>
      		}
      		{ renderCards(props.list) }
      	</div>
      </div>
    </div>

  )
}
export default CardBlockShop;