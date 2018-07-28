const initialState = {
  list: []
};

export default function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, list: [...state.list, action.payload] };
    case 'REMOVE_TODO':
      return {
        ...state,
        list: [...state.list.slice(0, state.list.length - 1)]
      };
  }
  return state;
}
