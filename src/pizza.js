// @flow

import Immutable from 'immutable';

const immutableState = Immutable.Map({
  fetching: false,
  data: Immutable.Map({}),
});

// Actions
const LOAD = 'pizza/order/LOAD';
const CREATE = 'pizza/order/CREATE';
const UPDATE = 'pizza/order/UPDATE';
const REMOVE = 'pizza/order/REMOVE';

// Reducer
export default function reducer(state = immutableState, action = {}) {
  switch (action.type) {
    case 'STARTING_REQUEST':
      return state.set('fetching', true);
    case 'FINISHED_REQUEST':
      return state.set('fetching', false).set('data', Immutable.Map(action.response.data.goldberg));
    default:
      return state;
  }
}

// Action Creators
const startingRequest = () => ({
  type: 'STARTING_REQUEST',
});

const finishedRequest = response => ({
  type: 'FINISHED_REQUEST',
  response,
});

export function loadWidgets() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, widget };
}

export function removeWidget(widget) {
  return { type: REMOVE, widget };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget() {
// return dispatch => get('/widget').then(widget => dispatch(setWidget(widget)));
// }

export const getGraph = payload => (dispatch) => {
  dispatch(startingRequest());
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('POST', 'https://core-graphql.dev.waldo.photos/pizza?', true);
    request.setRequestHeader('Content-Type', 'application/graphql');
    request.send(payload);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        resolve(request.responseText);
      }
    };
  }).then(response => dispatch(finishedRequest(JSON.parse(response))));
};
