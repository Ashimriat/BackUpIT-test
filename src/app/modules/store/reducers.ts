import { handleActions, combineActions } from 'redux-actions';
import compact from 'lodash.compact';
import { addFavourite, removeFavourite, setCurrentMovie, addGenres, setError } from './actions';
import { FavouriteMovie, Genre } from '../../../interfaces';

export interface State {
  favourite: Array<FavouriteMovie>;
  currentMovie: number;
  genres: Array<Genre>;
  error: string;
}

export const defaultState = {
  favourite: JSON.parse(localStorage.getItem('favourite')) || [],
  currentMovie: -1,
  genres: [],
  error: ''
};

export const rootReducer = handleActions(
  {
    [addFavourite]: (state, action) => {
      const newFavourite = [
        ...state.favourite,
        ...action.payload.favourite
      ];
      if (action.payload.overwrite) {
        localStorage.setItem('favourite', JSON.stringify(newFavourite));
      }
      return {
        ...state,
        favourite: compact(newFavourite)
      };
    },
    [removeFavourite]: (state, action) => {
      const removedIndex = state.favourite.findIndex(movie => movie.id === action.payload.id);
      const newFavourite = [...state.favourite];
      newFavourite.splice(removedIndex, 1);
      localStorage.setItem('favourite', JSON.stringify(newFavourite));
      return {
        ...state,
        favourite: newFavourite
      };
    },
    [setCurrentMovie]: (state, action) => ({
      ...state,
      currentMovie: action.payload.id
    }),
    [addGenres]: (state, action) => ({
      ...state,
      genres: action.payload.genres
    }),
    [setError]: (state, action) => ({
      ...state,
      error: action.payload.message
    }),
  },
  defaultState
);
