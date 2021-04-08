import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from '../Components/Utils/Misc';
import { LOGIN_USER, 
		REGISTER_USER, 
		AUTH_USER, 
		LOGOUT_USER,
		ADD_TO_CART_USER,
		GET_CART_ITEM_USER,
		REMOVE_CART_ITEM_USER,
		ON_SUCCESS_BUY_USER } from './types'

export function loginUser(dataToSubmit)
{
	const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
		.then(response => response.data);
	return {
		type: LOGIN_USER,
		payload: request
	}
}

export function registerUser(dataToSubmit)
{
	const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
		.then(response => response.data);
	return {
		type: REGISTER_USER,
		payload: request
	}
}

export function auth() 
{
	const request = axios.get(`${USER_SERVER}/auth`)
		.then(response => response.data);
	return {
		type: AUTH_USER,
		payload: request
	}
}

export function logoutUser() 
{
	const request = axios.get(`${USER_SERVER}/logout`)
		.then(response => response.data);
	return {
		type: LOGOUT_USER,
		payload: request
	}
}

export function addToCartUser(id)
{
	const request = axios.post(`${USER_SERVER}/addToCart?productId=${id}`)
		.then(response => response.data)
		console.log('addToCart');
	return {
		type: ADD_TO_CART_USER,
		payload: request
	}
}

export function getCartItems(cartItem, userCart) 
{
	const request = axios.get(`${PRODUCT_SERVER}/article_by_id?id=${cartItem}&type=array`)
		.then(response => {
			userCart.forEach(item => {
				response.data.forEach((k,i) => {
					if(item.id === k._id) {
						response.data[i].quantity = item.quantity;
					}

				})
			})
			console.log(response.data);
			return response.data;
			
		})
	return {
		type: GET_CART_ITEM_USER,
		payload: request
	}
}

export function removeCartItem(id)
{
	const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
		.then(response => {
			response.data.cart.forEach(item => {
				response.data.cartDetail.forEach((k,i) => {
					if(item.id === k._id)
					{
						response.data.cartDetail[i].quantity = item.quantity;
					}
				})
			})
			return response.data;
		})
	return {
		type: REMOVE_CART_ITEM_USER,
		payload: request
	}
}


export function onSuccessBuy (data) {
	const request = axios.post(`${USER_SERVER}/successBuy`, data)
		.then(response => response.data)
	return {
		type: ON_SUCCESS_BUY_USER,
		payload: request
	}

}