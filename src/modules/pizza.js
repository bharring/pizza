// Ducks https://github.com/erikras/ducks-modular-redux

import axios from 'axios';
import uuidv4 from 'uuid/v4';

export const REQUEST_PENDING = 'pizza/order/REQUEST_PENDING';
export const REQUEST_COMPLETED = 'pizza/order/REQUEST_COMPLETED';
export const REQUEST_FAILED = 'pizza/order/REQUEST_FAILED';

export const RECEIVE_PIZZA_SIZES = 'pizza/order/RECEIVE_PIZZA_SIZES';
export const RECEIVE_TOPPINGS_FOR_SIZE = 'pizza/order/RECEIVE_TOPPINGS_FOR_SIZE';
export const ADD_TOPPING_TO_ORDER = 'pizza/order/ADD_TOPPING_TO_ORDER';
export const REMOVE_TOPPING_FROM_ORDER = 'pizza/order/REMOVE_TOPPING_FROM_ORDER';
export const COMPLETE_PIZZA = 'pizza/order/COMPLETE_PIZZA';
export const REMOVE_PIZZA = 'pizza/order/REMOVE_PIZZA';

// default state
export const defaultState = {
  cart: [],
  error: undefined,
  isFetching: false,
  order: {
    toppings: [],
  },
  pizzas: [],
  toppings: [],
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case REQUEST_PENDING:
      return { ...state, isFetching: true };
    case REQUEST_COMPLETED:
      return { ...state, isFetching: false };
    case REQUEST_FAILED:
      return { ...state, isFetching: false, error: action.error };
    case RECEIVE_PIZZA_SIZES:
      return { ...state, pizzas: action.pizzas };
    case RECEIVE_TOPPINGS_FOR_SIZE:
      return {
        ...state,
        order: {
          ...state.order,
          size: action.size,
          toppings: action.toppings.filter(t => t.defaultSelected).map(t => t.topping),
        },
        toppings: action.toppings,
      };
    case ADD_TOPPING_TO_ORDER:
      return {
        ...state,
        order: { ...state.order, toppings: [...state.order.toppings, action.topping] },
      };
    case REMOVE_TOPPING_FROM_ORDER: {
      const index = state.order.toppings.findIndex(top => action.topping.name === top.name);
      return {
        ...state,
        order: {
          ...state.order,
          toppings: [
            ...state.order.toppings.slice(0, index),
            ...state.order.toppings.slice(index + 1, state.order.toppings.length),
          ],
        },
      };
    }
    case COMPLETE_PIZZA: {
      const order = { ...state.order, id: uuidv4() };
      return { ...state, cart: [...state.cart, order] };
    }
    case REMOVE_PIZZA: {
      const index = state.cart.findIndex(pizza => action.id === pizza.id);
      return {
        ...state,
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1, state.cart.length)],
      };
    }
    default:
      return state;
  }
}

// Action Creators
export const requestPending = () => ({
  type: REQUEST_PENDING,
});

export const requestCompleted = () => ({
  type: REQUEST_COMPLETED,
});

export const requestFailed = error => ({
  type: REQUEST_FAILED,
  error,
});

export const receivePizzaSizes = pizzas => ({
  type: RECEIVE_PIZZA_SIZES,
  pizzas,
});

export const receiveToppingsForSize = (size, toppings) => ({
  type: RECEIVE_TOPPINGS_FOR_SIZE,
  size,
  toppings,
});

export const addToppingToOrder = topping => ({
  type: ADD_TOPPING_TO_ORDER,
  topping,
});

export const removeToppingFromOrder = topping => ({
  type: REMOVE_TOPPING_FROM_ORDER,
  topping,
});

export const completePizza = () => ({
  type: COMPLETE_PIZZA,
});

export const removePizza = id => ({
  type: REMOVE_PIZZA,
  id,
});

// Axios fetch helper
const axiosFetch = ({ query, variables, dispatch }) => {
  dispatch(requestPending());
  return axios
    .post('https://core-graphql.dev.waldo.photos/pizza', { query, variables })
    .catch(error => dispatch(requestFailed(error)))
    .then((res) => {
      dispatch(requestCompleted());
      return res;
    });
};

// Thunk Actions
export const fetchPizzaSizes = () => dispatch =>
  axiosFetch({
    query: `query {
       pizzaSizes {
         name
         maxToppings
         basePrice
       }
     }`,
    dispatch,
  }).then(res => dispatch(receivePizzaSizes(res.data.data.pizzaSizes)));

export const fetchToppingsForSize = size => dispatch =>
  axiosFetch({
    query: `query PizzaSizeByName($name: PizzaSizes!) {
      pizzaSizeByName(name: $name) {
        name
        maxToppings
        basePrice
        toppings {
          defaultSelected
          topping {
            name
            price
          }
        }
      }
    }`,
    variables: { name: size.name.toUpperCase() },
    dispatch,
  }).then(res => dispatch(receiveToppingsForSize(size, res.data.data.pizzaSizeByName.toppings)));
