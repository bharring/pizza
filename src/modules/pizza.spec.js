import reducer, * as types from './pizza';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      cart: [],
      error: undefined,
      isFetching: false,
      order: {
        toppings: [],
      },
      pizzas: [],
      toppings: [],
    });
  });
});
