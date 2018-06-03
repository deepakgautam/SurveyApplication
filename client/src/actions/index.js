import axios from 'axios';
import {FETCH_USER} from '../utils/constants' 

// export const  fetchUser = () =>{
//     return async function(dispatch) {
//      const user=  await axios.get('/api/current_user');
//      dispatch({type: FETCH_USER ,payload: user});
//     }
// }
//es6 syntax of above function
export const  fetchUser = () =>async (dispatch) =>{
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER ,payload: res.data});
}
export const  handelPaymentTocken = (token) =>async (dispatch) =>{
    const res = await axios.post('/api/stripe',token);
    dispatch({type: FETCH_USER ,payload: res.data});
}