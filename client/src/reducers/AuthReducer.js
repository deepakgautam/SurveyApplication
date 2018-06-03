import {FETCH_USER} from '../utils/constants' 
export default function(state = null, action) { 
    if(typeof action == 'undefined') return state;
    switch(action.type) {
        case FETCH_USER :
        {
            console.log('action payload',action.payload);
            return action.payload || false;
            break;
        }
    }
    return state;
};