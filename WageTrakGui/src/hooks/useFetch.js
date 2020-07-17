import { useReducer, useCallback } from 'react';

const initialState = {
	selectedJob: null,
	requestUser: null,
	receivedUser: null
}
//this might not be necessary
//it might be a vehicle for carrying data from shift to other components
const fetchReducer = (currentFetchState, action) => {
	switch(action.type) {
		case 'USERDATA':
			console.log(action.receivedUser)
			return { ...currentFetchState, receivedUser: action.receivedUser }
		default:
			console.log('default case reached')
	}


}

const useFetch = () => {
	const [ fetchState, dispatchFetch ] = useReducer(fetchReducer, initialState);

	const requestUser = useCallback((url, method, body) => {
		console.log('useFetch method run')
		fetch(
			url,
			{
				method: method,
				body: body,
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost://3000'
				}
			}
		).then(res => {}
			console.log('first then block')
			console.log(res)
			// res.json()
		
			).then(res => {
				console.log(res);
				dispatchFetch({ type: 'USERDATA', receivedUser: res })
				// const [gotUser] = res;
				// updateUser(gotUser);
				// console.log(gotUser);
			}).catch(res => {
				// const [gotUser] = res.json();
				// updateUser(gotUser);
			});
	}, []);

	const test = 'michaelson';

	return ({
		requestUser: requestUser,
		receivedUser: fetchState.receivedUser,
		test: test
	});
}

export default useFetch;
