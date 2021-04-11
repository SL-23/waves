import axios from 'axios';

import { GET_SITE_INFO,
		 UPDATE_SITE_INFO
} from './types';

import { SITE_SERVER } from '../Components/Utils/Misc';

export function getSiteInfo() {
	const request = axios.get(`${SITE_SERVER}/site_info`)
		.then(response => response.data)
	return {
		type: GET_SITE_INFO,
		payload: request
	}
}

export function UpdateSiteData(dataToSubmit) {
	const request = axios.post(`${SITE_SERVER}/update_site`, dataToSubmit)
		.then(response => response.data)
	return {
		type: UPDATE_SITE_INFO,
		payload: request
	}
}

