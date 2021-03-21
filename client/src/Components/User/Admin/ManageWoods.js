import React, { Component } from 'react';

import FormField from '../../Utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../Utils/Form/FormAction';
import { getWoods, addOneWood } from '../../../actions/products_action';

import { connect } from 'react-redux';


class ManageWoods extends Component {

	state = {
	    formError: false,
	    formSuccess: false,
	    formData: {
	      name: {
	        element: 'input',
	        value: '',
	        config: {
	          label:'Wood name',
	          name: 'name_input',
	          type: 'text',
	          placeholder: 'Enter the wood'
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

  		this.props.dispatch(getWoods());
  		console.log(this.props.products.woods)
  	}

  	showCategoryItems = () => (
  		this.props.products.woods ?
  			this.props.products.woods.map((item) => (
  				<div key={item.name} className='category_item'> {item.name} </div>
  			))
  		: null
  	)

  	updateForm = (element) => {

	    const newFormdata = update(element, this.state.formData, 'woods');
	    this.setState({
	    	formError: false,
	    	formData: newFormdata
	    })
  	}

  	resetFieldsHandler = () => {
  		const newFormdata = resetFields(this.state.formData, 'woods');

  		this.setState({
  			formData: newFormdata,
  			formSuccess: true
  		});
  	}

  	submitForm = (event) => {
	    event.preventDefault();
	    let existingWoods = this.props.products.woods;
	    let dataToSubmit = generateData(this.state.formData, 'woods');
	    console.log(dataToSubmit)
	    let formIsValid = isFormValid(this.state.formData, 'woods');
	    if(formIsValid)
	    {
	    	this.props.dispatch(addOneWood(dataToSubmit, existingWoods)).then(() => {
        		console.log(this.props.products);
		        if(this.props.products.addWood) {
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
      			<h1>Woods</h1>
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

export default connect(mapStateToProps)(ManageWoods);