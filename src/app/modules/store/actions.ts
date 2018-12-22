import { createActions } from 'redux-actions';
import {FavouriteMovie, Genre} from '../../../interfaces';

export const { addFavourite, removeFavourite, setCurrentMovie, addGenres, setError } = createActions({
  ADD_FAVOURITE: (favourite: Array<FavouriteMovie>, overwrite: boolean = false) => ({ favourite, overwrite }),
  REMOVE_FAVOURITE: (id: number) => ({ id }),
  SET_CURRENT_MOVIE: (id: number) => ({ id }),
  ADD_GENRES: (genres: Array<Genre>) => ({ genres }),
  SET_ERROR: (message: string) => ({ message })
});
