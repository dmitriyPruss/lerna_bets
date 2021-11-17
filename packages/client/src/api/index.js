import axios from 'axios';
import CONSTANTS from './../constants';
import { io } from 'socket.io-client';
import { createBetSuccess, createBetError } from './../actions';
import store from './../store';

const { BASE_URL, MY_LOCAL_IP, SOCKET_IO_URI, SOCKET_EVENTS } = CONSTANTS;

const axiosSets = {
  baseURL: BASE_URL

  // my home computer ip
  // baseURL: `http://${MY_LOCAL_IP}:5000/api`
};

const apiInstance = axios.create(axiosSets);

// GET
export const getBets = () => apiInstance.get('/bets');

// POST
const socket = io(SOCKET_IO_URI);

// my home computer ip
// const socket = io(`ws://${MY_LOCAL_IP}:5000`);

export const createBet = bet => {
  socket.emit(SOCKET_EVENTS.NEW_BET, bet);
  return apiInstance.post('/bets', {});
};

socket.on(SOCKET_EVENTS.NEW_BET, newBet => {
  store.dispatch(createBetSuccess(newBet));
});
socket.on(SOCKET_EVENTS.NEW_BET_ERROR, error => {
  store.dispatch(createBetError(error));
});

// UPDATE
export const updateBet = (id, isWinned) =>
  apiInstance.patch(`/bets/${id}`, isWinned);

// DELETE
export const deleteBet = id => apiInstance.delete(`/bets/${id}`);
