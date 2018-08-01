/*
 * action types
 */

export const ADD_MOVIE = 'ADD_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';

/*
 * action creators
 */

export function addMovie(object) {
  return { type: ADD_MOVIE, object };
}
export function removeMovie(object) {
  return { type: REMOVE_MOVIE, object };
}
