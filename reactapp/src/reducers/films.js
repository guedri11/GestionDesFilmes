import {
    CREATE_FILM,
    RETRIEVE_FILMS,
    UPDATE_FILM,
    DELETE_FILM,
    DELETE_ALL_FILMS,
  } from "../actions/types";
  
  const initialState = [];
  
  function filmReducer(films = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_FILM:
        return [...films, payload];
  
      case RETRIEVE_FILMS:
        return payload;
  
      case UPDATE_FILM:
        return films.map((film) => {
          if (film.id === payload.id) {
            return {
              ...film,
              ...payload,
            };
          } else {
            return film;
          }
        });
  
      case DELETE_FILM:
        return films.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_FILMS:
        return [];
  
      default:
        return films;
    }
  };
  
  export default filmReducer;