import axios from 'axios';
import CONSTANTS from './../constants';
import { io } from 'socket.io-client';
import { createBetSuccess, createBetError } from './../actions';
import store from './../store';

const { BASE_URL, MY_LOCAL_IP, SOCKET_EVENTS } = CONSTANTS;

const axiosSets = {
  baseURL: BASE_URL
  // baseURL: `http://${MY_LOCAL_IP}:5000/api`
};

const apiInstance = axios.create(axiosSets);

export const getBets = () => apiInstance.get('/bets');

// ------------------------------------
const socket = io('ws://localhost:5000');
// const socket = io(`ws://${MY_LOCAL_IP}:5000`);

export const createBet = bet => {
  console.log(`createBet API bet`, bet);
  socket.emit(SOCKET_EVENTS.NEW_BET, bet);
  return apiInstance.post('/bets', {});
};

socket.on(SOCKET_EVENTS.NEW_BET, newBet => {
  console.log(newBet);
  store.dispatch(createBetSuccess(newBet));
});

socket.on(SOCKET_EVENTS.NEW_BET_ERROR, error => {
  store.dispatch(createBetError(error));
});

// ------------------------------------
export const updateBet = (id, isWinned) =>
  apiInstance.patch(`/bets/${id}`, isWinned);

export const deleteBet = id => apiInstance.delete(`/bets/${id}`);
