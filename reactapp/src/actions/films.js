import {
    CREATE_FILM,
    RETRIEVE_FILMS,
    UPDATE_FILM,
    DELETE_FILM,
    DELETE_ALL_FILMS
  } from "./types";
  
  import FilmDataService from "../services/film.service";
  
  export const createFilm = (title, description) => async (dispatch) => {
    try {
      const res = await FilmDataService.create({ title, description });
  
      dispatch({
        type: CREATE_FILM,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveFilms = () => async (dispatch) => {
    try {
      const res = await FilmDataService.getAll();
  
      dispatch({
        type: RETRIEVE_FILMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateFilm = (id, data) => async (dispatch) => {
    try {
      const res = await FilmDataService.update(id, data);
  
      dispatch({
        type: UPDATE_FILM,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteFilm = (id) => async (dispatch) => {
    try {
      await FilmDataService.delete(id);
  
      dispatch({
        type: DELETE_FILM,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllFilms = () => async (dispatch) => {
    try {
      const res = await FilmDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_FILMS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findFilmsByTitle = (title) => async (dispatch) => {
    try {
      const res = await FilmDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_FILMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };