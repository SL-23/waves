import React, { Component } from 'react';
import FormField from '../../Utils/Form/FormField';
import { update, generateData, isFormValid, populateFields } from '../../Utils/Form/FormAction';
import { getSiteInfo, UpdateSiteData } from '../../../actions/site_action';
import { connect } from 'react-redux';

class UpdateSiteInfo extends Component {
	state = {
  	formError: false,
		formSuccess: '',
		formData: {
			address: {
				element: 'input',
				value: '',
				config: {
					label: 'Address',
					name: 'address_input',
					type: 'text',
					placeholder: 'Enter your address'
				},
				validation: {
					required: true,
					email: false
				},
				valid: false,
				touched: false,
				validationMessage:'',
				showLabel: true
			},

			hours: {
				element: 'input',
				value: '',
				config: {
					label: 'Working hours',
					name: 'hours_input',
					type: 'text',
					placeholder: 'Enter working hours'
				},
				validation: {
					required: true,
					email: false
				},
				valid: false,
				touched: false,
				validationMessage:'',
				showLabel: true
			},

			phone: {
				element: 'input',
				value: '',
				config: {
					label: 'Phone',
					name: 'phone_input',
					type: 'text',
					placeholder: 'Enter phone'
				},
				validation: {
					required: true,
					email: false
				},
				valid: false,
				touched: false,
				validationMessage:'',
				showLabel: true
			},
			email: {
				element: 'input',
				value: '',
				config: {
					label: 'Working email',
					name: 'email_input',
					type: 'text',
					placeholder: 'Enter working email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage:'',
				showLabel: true
			},
		}
  	}

  	submitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formData, 'site_info');
		let formIsValid = isFormValid(this.state.formData, 'site_info');
		if(formIsValid)
		{
			console.log(dataToSubmit);
			this.props.dispatch(UpdateSiteData(dataToSubmit)).then(() => {
				this.setState({
					formSuccess: true
				}, () => {
					setTimeout(() => {
						this.setState({
							formSuccess: false
						})
					}, 2000)
				})
			})

		}
		else {
			this.setState({
				formError: true
			})
		}
	}

	updateForm = (element) => {

		const newFormdata = update(element, this.state.formData, 'site_info');
		this.setState({
			formError: false,
			formData: newFormdata
		})
	}

	componentDidMount() {
		this.props.dispatch(getSiteInfo()).then(() => {
			const newFormdata = populateFields(this.state.formData, this.props.site.siteInfo[0]);
			this.setState({
			formData: newFormdata
			})
		})
		

	}
  
  	render() {
    	return (
      		<div>
        		<form onSubmit={(event)=> this.submitForm(event)} >
  					<h2>Site Information</h2>
					<FormField 
		      			id={'address'}
		      			formData={this.state.formData.address}
		      			change={(element)=> this.updateForm(element)}
		      		/>
		      		<FormField 
		      			id={'hours'}
		      			formData={this.state.formData.hours}
		      			change={(element)=> this.updateForm(element)}
		      		/>
  					<FormField 
		      			id={'email'}
		      			formData={this.state.formData.email}
		      			change={(element)=> this.updateForm(element)}
		      		/>
		      		<FormField 
		      			id={'phone'}
		      			formData={this.state.formData.phone}
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
		      			Update site information
		      		</button>

      			</form>
      		</div>
    	)
  	}
}

const mapStateToProps = (state) => {
	return {
		site: state.site
	}
}

export default connect(mapStateToProps)(UpdateSiteInfo)