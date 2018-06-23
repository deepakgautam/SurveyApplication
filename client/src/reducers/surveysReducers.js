import {FETCH_SURVEYS} from '../utils/constants' 
export default function (state =[] ,action){
    switch(action.type)  {
        case FETCH_SURVEYS : 
        return action.payload;
        default :
        return state;
    }
}