const initialState = {
  movieArray: []
};

export default function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MOVIE':
      return { ...state, movieArray: [...state.movieArray, action] };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        list: [...state.list.slice(0, state.list.length - 1)]
      };
  }
  return state;
}
