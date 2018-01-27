import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPlayingState: ['state'] // playing will be either true or false
});

export const PlayingStateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  playingState: false
});

/* ------------- Selectors ------------- */

export const PlayingStateSelectors = {
  playingState: state => state.playingState
};

/* ------------- Reducers ------------- */

// request the avatar for a user
export const set = (state, { playingState }) =>
  state.merge({ playingState: !state.playingState });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PLAYING_STATE]: set
});
