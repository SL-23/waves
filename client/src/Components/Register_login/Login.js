import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormField from '../Utils/Form/FormField';
import { update, generateData, isFormValid } from '../Utils/Form/FormAction';
import { loginUser } from '../../actions/user_action';

class Login extends Component {
	state = {
		formError: false,
		formSuccess: '',
		formData: {
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
			},

			password: {
				element: 'input',
				value: '',
				config: {
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter your password'
				},
				validation: {
					required: true,
					email: false
				},
				valid: false,
				touched: false,
				validationMessage:''
			}

		}


	}

	submitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formData, 'login');
		let formIsValid = isFormValid(this.state.formData, 'login');
		if(formIsValid)
		{
			this.props.dispatch(loginUser(dataToSubmit)).then(response => {
				if(response.payload.loginSuccess) {
					console.log(response.payload);
					this.props.history.push('/user/dashboard');
				}
				else {
					this.setState({
						formError: true
					})
				}
			});
		}
		else {
			this.setState({
				formError: true
			})
		}
	}

	updateForm = (element) => {
		const newFormdata = update(element, this.state.formData, 'login');
		this.setState({
			formError: false,
			formData: newFormdata
		})
	}
  
  render() {

    return (
      <div className='signin_wrapper'>
      	<form onSubmit={(event)=> this.submitForm(event)} >

      		<FormField 
      			id={'email'}
      			formData={this.state.formData.email}
      			change={(element)=> this.updateForm(element)}
      		/>
      		<FormField 
      			id={'password'}
      			formData={this.state.formData.password}
      			change={(element)=> this.updateForm(element)}
      		/>
      		{
      			this.state.formError ?
      			<div className='error_label'>
      				Your email or password is incorrect, please check.
      			</div>
      			: null
      		}
      		<button onClick={(event)=> this.submitForm(event)}>
      			Login
      		</button>
      	</form>
      </div>
    )
  }
}

export default connect()(withRouter(Login));