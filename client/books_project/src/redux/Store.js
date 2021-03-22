import {createStore,combineReducers} from 'redux';
import userReducer from './UserReducer'

const reducer=combineReducers({userReducer})
const store=createStore(reducer)
window.store=store;

export default store;