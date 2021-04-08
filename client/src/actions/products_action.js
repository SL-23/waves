import axios from 'axios';

import { PRODUCT_SERVER } from '../Components/Utils/Misc';

import { GET_PRODUCTS_BY_ARRIVAL, 
		GET_PRODUCTS_BY_SELL, 
		GET_BRANDS, 
		GET_WOODS,
		GET_PRODUCTS_TO_SHOP, 
		ADD_ONE_PRODUCT, 
		CLEAR_PRODUCT, 
		ADD_ONE_BRAND, 
		ADD_ONE_WOOD, 
		GET_PRODUCT_DETAILS,
		CLEAR_PRODUCT_DETAILS  } from './types';

export function getProductsByArrival() {
	const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
	.then(response => response.data);
	return {
		type: GET_PRODUCTS_BY_ARRIVAL,
		payload: request
	}

}

export function getProductsBySell() {
	const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
	.then(response => response.data);
	return {
		type: GET_PRODUCTS_BY_SELL,
		payload: request
	}
}

// CATEGORIES



export function getBrands() {
	const request = axios.get(`${PRODUCT_SERVER}/brands`)
	.then(response => response.data);
	return {
		type: GET_BRANDS,
		payload: request
	}


}

export function getWoods() {
	const request = axios.get(`${PRODUCT_SERVER}/woods`)
	.then(response => response.data);
	return {
		type: GET_WOODS,
		payload: request
	}

}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
	const data = {
		limit,
		skip,
		filters
	}

	const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
	.then(response => {

		let newState = [
			...previousState,
			...response.data.articles
		];

		return {
			size: response.data.size,
			articles: newState
		}
	});

	return {
		type: GET_PRODUCTS_TO_SHOP,
		payload:request
	}

}

export function addOneProduct(dataToSubmit) {
	
	const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
		.then(response => response.data);
	return {
		type: ADD_ONE_PRODUCT,
		payload: request
	}
}

export function clearProduct() {
	return {
		type: CLEAR_PRODUCT,
		payload: ''
	}
}

export function addOneBrand(dataToSubmit, existingBrands) {
	const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
		.then(response => {
			let brands = [...existingBrands, response.data.brands];
			return {
				success: response.data.success,
				brands
			}
		});
		console.log(request);
		return {
			type: ADD_ONE_BRAND,
			payload: request
		}
		
}

export function addOneWood(dataToSubmit, existingWoods) {
	const request = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
		.then(response => {
			let woods = [...existingWoods, response.data.woods];
			return {
				success: response.data.success,
				woods
			}
		});

		return {
			type: ADD_ONE_WOOD,
			payload: request
		}
}

export function getProductDetails(id) {
	//{{url}}/api/product/article_by_id?id=5b2d4b70e4b4a1d22d374f8b&type=single
	const request = axios.get(`${PRODUCT_SERVER}/article_by_id?id=${id}&type=single`)
		.then(response => {
			console.log(response.data[0]);
			return response.data[0]
		});
		return {
			type: GET_PRODUCT_DETAILS,
			payload: request
		}
}

export function clearProductDetails () {
	return {
		type: CLEAR_PRODUCT_DETAILS,
		payload: ''
	}
}
