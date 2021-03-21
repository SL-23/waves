import React, { Component } from 'react';
import ImgLightbox from '../Utils/ImgLightbox';

class ProdImg extends Component {

	state = {
		lightbox: false,
		imagePos: 0,
		lightboxImages: []
	}
  	
  	componentDidMount() {
  		console.log(this.props.detail.images);
  		if(this.props.detail.images.length > 0) {
  			let lightboxImages = [];

  			this.props.detail.images.forEach(item => {
  				lightboxImages.push(item.url);

  			})
  			this.setState({
  				lightboxImages
  			})

  		}
  		
  	}

  	renderCardImage = (images) => {
  		if(images.length > 0) {
  			return images[0].url
  		}
  		else {
  			return `/images/image_not_available.png`
  		}
  	}

  	handleLightbox = (pos) => {
  		if(this.state.lightboxImages.length > 1) {
  			console.log('show lightbox')
  			this.setState({
  				lightbox: true,
  				imagePos: pos
  			})

  		}
  	}

  	handleLightboxClose = () => {
  		this.setState({
  			lightbox: false
  		})
  	}

  	showThumbs = (detail) => (
  		this.state.lightboxImages.map((item, i) => (
  			i > 0 ?
  			<div
  				key={i}
  				onClick={() => this.handleLightbox(i)}
  				className='thumb'
  				style={{background: `url(${item}) no-repeat`}}
  			>

  			</div>
  			: null
  		))
  	)

  	render() {
  		const {detail} = this.props;
    	return (
      		<div className='product_image_container'>
      			<div className='main_pic'>
      				<div
      					style={{background: `url(${this.renderCardImage(detail.images)}) no-repeat`}}
      					onClick={() => this.handleLightbox(0)}
      				>

      				</div>
      			</div>
        		<div className='main_thumbs'>
        			{ this.showThumbs(detail) }
        		</div>
        		<div>
        		{
        			this.state.lightbox ?
        				<ImgLightbox 
        					id={detail.id}
        					images={this.state.lightboxImages}
        					open={this.state.lightbox}
        					pos={this.state.imagePos}
        					onClose={() => this.handleLightboxClose()}
        				/>
        			: null
        		}
        		</div>
      		</div>
    	)
  }
}

export default ProdImg