import React, { Component } from 'react';
import FormField from '../Utils/Form/FormField';
import { update, generateData, isFormValid, populateFields } from '../Utils/Form/FormAction';

import { connect } from 'react-redux';

class UpdatePersonalInfo extends Component {

  state = {
  	formError: false,
		formSuccess: '',
		formData: {
			name: {
				element: 'input',
				value: '',
				config: {
					name: 'name_input',
					type: 'text',
					placeholder: 'Enter your name'
				},
				validation: {
					required: true,
					email: false
				},
				valid: false,
				touched: false,
				validationMessage:''
			},

			lastname: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'text',
					placeholder: 'Enter your lastname'
				},
				validation: {
					required: true,
					email: false
				},
				valid: false,
				touched: false,
				validationMessage:''
			},

			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage:''
			}
		}
  	}

  	submitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formData, 'update_user');
		let formIsValid = isFormValid(this.state.formData, 'update_user');
		if(formIsValid)
		{
			console.log(dataToSubmit);
		
		}
		else {
			this.setState({
				formError: true
			})
		}
	}

	updateForm = (element) => {

		const newFormdata = update(element, this.state.formData, 'update_user');
		this.setState({
			formError: false,
			formData: newFormdata
		})
	}

	componentDidMount() {
		const newFormdata = populateFields(this.state.formData, this.props.user.userData);
		this.setState({
			formData: newFormdata
		})

	}

  	render() {
    	return (
      		<div>
        		<form onSubmit={(event)=> this.submitForm(event)} >
      					<h2>Personal Information</h2>

      					<div className='form_block_two'>
      						<div className='block'>
      							<FormField 
					      			id={'name'}
					      			formData={this.state.formData.name}
					      			change={(element)=> this.updateForm(element)}
					      		/>
					      		
					      	</div>
					      	<div className='block'>
					      		<FormField 
					      			id={'lastname'}
					      			formData={this.state.formData.lastname}
					      			change={(element)=> this.updateForm(element)}
					      		/>
      							
					      	</div>
      						
      					</div>
      					<FormField 
			      			id={'email'}
			      			formData={this.state.formData.email}
			      			change={(element)=> this.updateForm(element)}
			      		/>
			      		{
			      			this.state.formSuccess ?
			      			<div className='form_success'>Success</div>
			      			: null
			      		}
				      	{
			      			this.state.formError ?
			      			<div className='error_label'>
			      				Your email or password is incorrect, please check.
			      			</div>
			      			: null
		      		   	}
			      		<button onClick={(event)=> this.submitForm(event)}>
			      			Update personal information
			      		</button>

      				</form>
      		</div>
    	)
  	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(UpdatePersonalInfo);

