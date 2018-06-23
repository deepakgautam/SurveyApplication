import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import {reducer as FormReducerRedux} from 'redux-form';
import surveyReducer from './surveysReducers'

/* this is the root reducers  for all  reducers
   state is the state the Application state 
   all these keys {AuthData,....} are available
   as the key of the application state and used in the react 
*/
const rootReducer = combineReducers({
   AuthUser : AuthReducer,
   form :FormReducerRedux,
   surveyRecord : surveyReducer

});
export default rootReducer;
