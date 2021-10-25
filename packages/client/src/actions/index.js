import ACTION_TYPES from './actionTypes';

export const changeThemeAction = () => ({
  type: ACTION_TYPES.CHANGE_THEME
});

// Create:
export const createBetAction = bet => ({
  type: ACTION_TYPES.CREATE_BET_ACTION,
  bet
});

export const createBetRequest = () => ({
  type: ACTION_TYPES.CREATE_BET_REQUEST
});

export const createBetSuccess = newBet => ({
  type: ACTION_TYPES.CREATE_BET_SUCCESS,
  newBet
});

export const createBetError = error => ({
  type: ACTION_TYPES.CREATE_BET_ERROR,
  error
});

//Read
export const getBetsAction = () => ({
  type: ACTION_TYPES.GET_BETS_ACTION
});

export const getBetsRequest = () => ({
  type: ACTION_TYPES.GET_BETS_REQUEST
});

export const getBetsSuccess = bets => ({
  type: ACTION_TYPES.GET_BETS_SUCCESS,
  bets
});

export const getBetsError = error => ({
  type: ACTION_TYPES.GET_BETS_ERROR,
  error
});

//Update:
export const updateBetAction = (id, isWinned) => ({
  type: ACTION_TYPES.UPDATE_BET_ACTION,
  id,
  isWinned
});

export const updateBetRequest = () => ({
  type: ACTION_TYPES.UPDATE_BET_REQUEST
});

export const updateBetSuccess = bet => ({
  type: ACTION_TYPES.UPDATE_BET_SUCCESS,
  bet
});

export const updateBetError = error => ({
  type: ACTION_TYPES.UPDATE_BET_ERROR,
  error
});

//Delete:
export const deleteBetAction = id => ({
  type: ACTION_TYPES.DELETE_BET_ACTION,
  id
});

export const deleteBetRequest = () => ({
  type: ACTION_TYPES.DELETE_BET_REQUEST
});

export const deleteBetSuccess = id => ({
  type: ACTION_TYPES.DELETE_BET_SUCCESS,
  id
});

export const deleteBetError = error => ({
  type: ACTION_TYPES.DELETE_BET_ERROR,
  error
});
