import { useCallback, useState } from 'react';


const useUser = () => {

	const [ userState, setUserState ] = useState({});
	const [ jobState, setJobState ] = useState({});

	const setUser = useCallback((user) => {
		setUserState(user);
	}, []);

	const setJob = useCallback((job) => {
		setJobState(job);
		console.log(jobState.name);
	}, []);

	return {
		currentJob: jobState,
		currentUser: userState,
		setUser: setUser,
		setJob: setJob
	}
}

export default useUser;
