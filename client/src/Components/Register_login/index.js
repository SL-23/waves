import React from 'react';
import MyButton from '../Utils/Button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className='page_wrapper'>
    	<div className='container'>
    		<div className='register_login_container'>
    			<div className='left'>
    				<h1>New customers</h1>
    				<p>become our new customer now!</p>
    				<MyButton 
    					type='default'
    					title='Create an account'
    					linkTo='/register'
    					addStyle={{
    						margin: '10px 0 0 0'

    					}}
    				/>
    			</div>

    			<div className='right'>
    				<h2>Registered customers</h2>
    				<p>If you have registered, please log in</p>
    				<Login />
    			</div>
      		
      		</div>
      	</div>
    </div>

  )
}
export default RegisterLogin;