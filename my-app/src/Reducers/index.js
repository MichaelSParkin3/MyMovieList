import movieListReducer from './move_list_reducer.js';
import { combineReducers } from 'redux';
console.log('HIHIHI');
export default combineReducers({
  movieList: movieListReducer
});
