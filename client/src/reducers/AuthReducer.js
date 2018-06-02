import {FETCH_USER} from '../utils/constants' 
export default function(state = null, action) { 
    if(typeof action == 'undefined') return state;
    switch(action.type) {
        case FETCH_USER :
        {
            return action.payload || false;
            break;
        }
    }
    return state;
};