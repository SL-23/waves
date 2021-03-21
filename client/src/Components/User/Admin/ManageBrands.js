import React, { Component } from 'react';

import FormField from '../../Utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../Utils/Form/FormAction';
import { getBrands, addOneBrand } from '../../../actions/products_action';

import { connect } from 'react-redux';


class ManageBrands extends Component {

	state = {
	    formError: false,
	    formSuccess: false,
	    formData: {
	      name: {
	        element: 'input',
	        value: '',
	        config: {
	          label:'Brand name',
	          name: 'name_input',
	          type: 'text',
	          placeholder: 'Enter the brand'
	        },
	        validation: {
	          required: true,
	          email: false
	        },
	        valid: false,
	        touched: false,
	        validationMessage:'',
	        showLabel: true
	      }
	  	}
  	}
  
  	componentDidMount() {
  		this.props.dispatch(getBrands());
  	}

  	showCategoryItems = () => (
  		this.props.products.brands ?
  			this.props.products.brands.map((item) => (
  				<div key={item.name} className='category_item'> {item.name} </div>
  			))
  		: null
  	)

  	updateForm = (element) => {

	    const newFormdata = update(element, this.state.formData, 'brands');
	    this.setState({
	    	formError: false,
	    	formData: newFormdata
	    })
  	}

  	resetFieldsHandler = () => {
  		const newFormdata = resetFields(this.state.formData, 'brands');

  		this.setState({
  			formData: newFormdata,
  			formSuccess: true
  		});
  	}

  	submitForm = (event) => {
	    event.preventDefault();
	    let existingBrands = this.props.products.brands;
	    let dataToSubmit = generateData(this.state.formData, 'brands');
	    console.log(dataToSubmit)
	    let formIsValid = isFormValid(this.state.formData, 'brands');
	    if(formIsValid)
	    {
	    	this.props.dispatch(addOneBrand(dataToSubmit, existingBrands)).then(() => {
        		console.log(this.props.products);
		        if(this.props.products.addBrand) {
		        	console.log('okoko');
		          	this.resetFieldsHandler();

		        }
		        else {
		          this.setState({formError: true})
		        }
		    })
	    }
	}

  	render() {
    	return (
      		<div className='admin_category_wrapper'>
      			<h1>Brands</h1>
      			<div className='admin_two_column'>
      				<div className='left'>
      					<div className='brands_container'>
      						{ this.showCategoryItems() }
      					</div>
      				</div>
      				<div className='right'>
      					<form onSubmit={(event) => this.submitForm(event)} >
			            <FormField 
			              id={'name'}
			              formData={this.state.formData.name}
			              change={(element)=> this.updateForm(element)}
			            />
			            <button onClick={(event)=> this.submitForm(event)}>
			               Submit
			            </button>
      					</form>
      				</div>
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

export default connect(mapStateToProps)(ManageBrands);